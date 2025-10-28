
# 🟢 Public Endpoints (Assignment Requirements)

| Method | Endpoint              | Description                                                                                  | Access  |
|:-------|:----------------------|:---------------------------------------------------------------------------------------------|:--------|
| GET    | `/api/experiences`    | Fetch all experiences (title, image, description, price, etc.)                               | Public  |
| GET    | `/api/experiences/:id`| Fetch details of a single experience (with available slots)                                  | Public  |
| POST   | `/api/bookings`       | Create a new booking (with user details, selected slot, and promo code if applicable)        | Public  |
| POST   | `/api/promo/validate` | Validate a promo code (e.g., `SAVE10`, `FLAT100`)                                            | Public  |

---

## 🔒 Developer-Only Endpoints (For Seeding / Admin Use)

| Method | Endpoint              | Description                                                                                  | Access          |
|:-------|:----------------------|:---------------------------------------------------------------------------------------------|:----------------|
| POST   | `/api/dev/experiences`| Add a new experience with title, image, description, price, location, etc.                   | Developer Only [x]  |
| POST   | `/api/dev/slots`      | Add available date and time slots for a specific experience                                  | Developer Only  |
| POST   | `/api/dev/promos`     | Add or update promo codes (type: percentage or flat discount)                                | Developer Only  |
