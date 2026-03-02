# EMotorad Viper Pre-Booking - Test Credentials

## Quick Login Credentials

For testing the login functionality, you can use **ANY email and password combination**. The authentication is mocked, so any values will work.

**Quick Test Login:**
- Email: `dealer@test.com`
- Password: `password123`

---

## Sample Signup Data

Here are realistic dealer profiles you can use to test the signup form:

### Dealer 1: Mumbai Motors
```
Full Name: Rajesh Kumar Sharma
Business Name: Mumbai Motors Pvt Ltd
GST Number: 27AAAAA0000A1Z5
Email: rajesh@mumbaímotors.com
Phone: 9876543210
Password: Dealer@123
Confirm Password: Dealer@123
✓ Agree to Terms & Conditions
```

### Dealer 2: Green Wheels Delhi
```
Full Name: Priya Singh
Business Name: Green Wheels India
GST Number: 07BBBBB1111B2Z6
Email: priya.singh@greenwheels.in
Phone: 9123456789
Password: SecurePass2024
Confirm Password: SecurePass2024
✓ Agree to Terms & Conditions
```

### Dealer 3: Bangalore E-Bikes
```
Full Name: Arun Menon
Business Name: Eco Bikes Bangalore Pvt Ltd
GST Number: 29CCCCC2222C3Z7
Email: arun@ecobikes.co.in
Phone: 8765432109
Password: EBikes@999
Confirm Password: EBikes@999
✓ Agree to Terms & Conditions
```

### Dealer 4: Pune City Cycles
```
Full Name: Meera Patel
Business Name: City Cycles & Motors
GST Number: 27DDDDD3333D4Z8
Email: meera.patel@citycycles.com
Phone: 7654321098
Password: Cycles#456
Confirm Password: Cycles#456
✓ Agree to Terms & Conditions
```

### Dealer 5: Chennai Speed Motors
```
Full Name: Venkatesh Raman
Business Name: Speed Motors Chennai Ltd
GST Number: 33EEEEE4444E5Z9
Email: venkat@speedmotors.net
Phone: 9988776655
Password: Speed@2024
Confirm Password: Speed@2024
✓ Agree to Terms & Conditions
```

---

## GST Number Format Reference

Valid GST format: `22AAAAA0000A1Z5`
- First 2 digits: State code (e.g., 27=Maharashtra, 07=Delhi, 29=Karnataka)
- Next 5 characters: PAN number letters
- Next 4 digits: Registration number
- Next 1 character: Entity type
- Next 1 character: Default 'Z'
- Last 1 character: Checksum

**Additional Valid GST Examples:**
- `09ABCDE1234F1Z5` (Uttar Pradesh)
- `36FGHIJ5678K2Z6` (Telangana)
- `24LMNOP9012M3Z7` (Gujarat)
- `19QRSTU3456N4Z8` (West Bengal)
- `10VWXYZ7890P5Z9` (Bihar)

---

## Phone Number Rules

- Must start with 6, 7, 8, or 9
- Must be exactly 10 digits
- No country code needed

**Valid Examples:**
- 9876543210
- 8123456789
- 7234567890
- 6345678901

---

## Password Requirements

- Minimum 8 characters
- No other complexity requirements for testing
- Must match in both Password and Confirm Password fields

**Suggested Test Passwords:**
- `password123`
- `Dealer@123`
- `Test1234`
- `EBike2024`

---

## Testing Flow

1. **Quick Test (Login)**: Use any email/password → redirects to booking page
2. **Full Test (Signup)**: Use one of the sample dealer profiles above → creates account → redirects to booking page
3. **Validation Test**: Try invalid GST/phone/email formats to see real-time validation

---

## Notes

- Authentication is **mocked** (no real backend)
- Data is stored in **localStorage**
- You can use the same email for both login and signup
- Real-time validation shows ✓ or ✗ icons next to fields
- GST numbers are auto-converted to uppercase
