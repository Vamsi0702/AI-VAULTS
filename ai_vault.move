module ai_vault::vault {
    use std::signer;
    use aptos_framework::coin::{Self as Coin, Coin};
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_std::table::{Table, new, add, borrow_mut, borrow, contains};

    /// Vault structure to keep track of user balances
    struct Vault has key {
        balances: Table<address, u64>,
    }

    /// Returns the vault address (admin address)
    fun vault_address(): address {
        @0xf92bce78284e26625730399419494ca7991a6788fa8d9171be313f41e8f02ccd
    }

    /// Initialize the vault (only admin can call)
    public entry fun initialize(account: &signer) {
        assert!(signer::address_of(account) == vault_address(), 100); // Only admin
        assert!(!exists<Vault>(vault_address()), 101); // Prevent re-init

        let table = new<address, u64>();
        let vault = Vault { balances: table };
        move_to(account, vault);
    }

    /// Deposit AptosCoins into the vault
    public entry fun deposit(account: &signer, amount: u64) acquires Vault {
        let sender = signer::address_of(account);
        let coin = Coin::withdraw<AptosCoin>(account, amount);
        Coin::deposit<AptosCoin>(vault_address(), coin);

        let vault = borrow_global_mut<Vault>(vault_address());
        if (!contains(&vault.balances, sender)) {
            add(&mut vault.balances, sender, amount);
        } else {
            let bal = borrow_mut(&mut vault.balances, sender);
            *bal = *bal + amount;
        }
    }

    /// Withdraw from the vault to a user (admin-only)
    public entry fun withdraw(recipient: address, amount: u64, admin: &signer) acquires Vault {
        assert!(signer::address_of(admin) == vault_address(), 203); // Only admin

        let vault = borrow_global_mut<Vault>(vault_address());
        assert!(contains(&vault.balances, recipient), 201); // No deposit found

        let bal = borrow_mut(&mut vault.balances, recipient);
        assert!(*bal >= amount, 202); // Not enough funds
        *bal = *bal - amount;

        // Withdraw from vault account (admin)
        let coin = Coin::withdraw<AptosCoin>(admin, amount);
        Coin::deposit<AptosCoin>(recipient, coin);
    }

    /// View any user's balance
    public fun get_user_balance(user: address): u64 acquires Vault {
        let vault = borrow_global<Vault>(vault_address());
        if (!contains(&vault.balances, user)) {
            0
        } else {
            *borrow(&vault.balances, user)
        }
    }
}
