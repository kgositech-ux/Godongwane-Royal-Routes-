# Godongwane Royal Routes Security Specification

## 1. Data Invariants
1. A user can only access and modify their own user profile document (`/users/{userId}` where `userId == request.auth.uid`).
2. A booking document (`/bookings/{bookingId}`) must belong to the authenticated user (`incoming().userId == request.auth.uid` on write, and `resource.data.userId == request.auth.uid` on read/update/delete).
3. Booking IDs and user IDs must adhere to safe format regex `^[a-zA-Z0-9_\-]+$`.
4. Support messages (`/supportMessages/{messageId}`) can only be created and viewed by the traveler whose `userId` matches the message's `userId`.
5. Critical keys such as `id` and `userId` cannot be spoofed or transferred to other accounts during updates.

## 2. The "Dirty Dozen" Payloads (Denial Proofing)
1. **Payload 1 (User ID Spoofing)**: Creating a booking with `userId: "another_traveler_uid"` while authenticated as `uid_1`. (Must be REJECTED).
2. **Payload 2 (Unauthenticated Write)**: Calling setDoc without active Firebase auth credentials. (Must be REJECTED).
3. **Payload 3 (Unauthenticated Query)**: Querying `/bookings` without auth. (Must be REJECTED).
4. **Payload 4 (Booking ID Injection)**: Document ID containing non-alphanumeric special characters `../../../malicious`. (Must be REJECTED).
5. **Payload 5 (Cross-Traveler Snooping)**: User B attempting to `getDoc` User A's booking reference. (Must be REJECTED).
6. **Payload 6 (Oversized Payload Exhaustion)**: A special requests note string greater than 5000 characters. (Must be REJECTED).
7. **Payload 7 (Status Tampering by Non-Owner)**: Updating booking status to 'completed' or 'refunded' by an arbitrary third party. (Must be REJECTED).
8. **Payload 8 (Negative Total Amount)**: Setting `totalAmount: -5000` to manipulate refunds. (Must be REJECTED).
9. **Payload 9 (Profile Impersonation)**: Modifying `/users/victim_user` when signed in as an unrelated user. (Must be REJECTED).
10. **Payload 10 (Support Message Infiltration)**: Injecting messages into another traveler's concierge thread. (Must be REJECTED).
11. **Payload 11 (Empty Required Fields)**: Writing a booking without `title`, `destination`, or `type`. (Must be REJECTED).
12. **Payload 12 (Invalid Enum Violation)**: Setting `status: 'hacked_status'` outside allowed booking states. (Must be REJECTED).
