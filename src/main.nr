use dep::std;
use dep::ecrecover;

fn main(
    challenger_address: pub Field,
    platform: pub Field,
    holdings: pub [Field; 5],
    expected_profit_percentage: pub u32,
    actual_profit_percentage: u32,
    solver_nickname: pub Field,
    hashed_message: [u8; 32],
    pub_key_x_solver: [u8; 32],
    pub_key_y_solver: [u8; 32],
    signature_solver: [u8; 64],
) {
    // Ensure the actual profit is at least as much as expected
    assert(actual_profit_percentage >= expected_profit_percentage);

    // Verify the signature
    let valid_signature = std::ecdsa_secp256k1::verify_signature(
        pub_key_x_solver,
        pub_key_y_solver,
        signature_solver,
        hashed_message,
    );
    assert(valid_signature);
}

fn verification(
    hashed_message: [u8; 32],
    pub_key_x: [u8; 32],
    pub_key_y: [u8; 32],
    signature: [u8; 64],
) {
    // Verify the signature
    let valid_signature = std::ecdsa_secp256k1::verify_signature(
        pub_key_x,
        pub_key_y,
        signature,
        hashed_message,
    );
    assert(valid_signature);
}
