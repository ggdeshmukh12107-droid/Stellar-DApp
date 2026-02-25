address 0x1 {
module SimpleOrganRegistry {
    use std::signer;
    use std::vector;
    use std::event;
    use std::string;

    struct RegisterEvent has copy, drop {
        user: address,
        role: string::String,
    }

    struct MatchEvent has copy, drop {
        donor: address,
        recipient: address,
        organ: string::String,
    }

    struct Donor has key {
        id: address,
        blood_type: u8,
        organ: string::String,
    }

    struct Recipient has key {
        id: address,
        blood_type: u8,
        required_organ: string::String,
        matched: bool,
    }

    struct OrganEvents has key {
        register_event: event::EventHandle<RegisterEvent>,
        match_event: event::EventHandle<MatchEvent>,
    }

    struct DonorsStore has key {
        donors: vector<Donor>,
    }

    struct RecipientsStore has key {
        recipients: vector<Recipient>,
    }

    public entry fun init(account: &signer) {
        assert!(!exists<OrganEvents>(signer::address_of(account)), 1);
        move_to(account, OrganEvents {
            register_event: event::new_event_handle<RegisterEvent>(account),
            match_event: event::new_event_handle<MatchEvent>(account),
        });
        move_to(account, DonorsStore { donors: vector::empty() });
        move_to(account, RecipientsStore { recipients: vector::empty() });
    }

    public entry fun register_donor(account: &signer, blood_type: u8, organ: string::String) {
        let donor = Donor {
            id: signer::address_of(account),
            blood_type,
            organ,
        };
        let store = borrow_global_mut<DonorsStore>(signer::address_of(account));
        vector::push_back(&mut store.donors, donor);

        let events = borrow_global_mut<OrganEvents>(signer::address_of(account));
        event::emit_event(&mut events.register_event, RegisterEvent {
            user: signer::address_of(account),
            role: string::utf8(b"Donor"),
        });
    }

    public entry fun register_recipient(account: &signer, blood_type: u8, required_organ: string::String) {
        let recipient = Recipient {
            id: signer::address_of(account),
            blood_type,
            required_organ,
            matched: false,
        };
        let store = borrow_global_mut<RecipientsStore>(signer::address_of(account));
        vector::push_back(&mut store.recipients, recipient);

        let events = borrow_global_mut<OrganEvents>(signer::address_of(account));
        event::emit_event(&mut events.register_event, RegisterEvent {
            user: signer::address_of(account),
            role: string::utf8(b"Recipient"),
        });
    }

    public entry fun match_organ(account: &signer, donor_addr: address, recipient_addr: address
