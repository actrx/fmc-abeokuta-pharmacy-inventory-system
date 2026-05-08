# Database Schema

---

# Departments Table

| Field | Type |
|---|---|
| id | UUID |
| name | String |

---

# Users Table

| Field | Type |
|---|---|
| id | UUID |
| full_name | String |
| email | String |
| password_hash | String |
| role | Enum |
| department_id | UUID |

---

# Inventory Table

| Field | Type |
|---|---|
| id | UUID |
| item_name | String |
| batch_number | String |
| quantity | Integer |
| reorder_level | Integer |
| expiry_date | Date |
| cost_price | Decimal |
| department_id | UUID |

---

# Transfers Table

| Field | Type |
|---|---|
| id | UUID |
| from_department_id | UUID |
| to_department_id | UUID |
| transfer_date | Date |
| status | Enum |

---

# Transfer Items Table

| Field | Type |
|---|---|
| id | UUID |
| transfer_id | UUID |
| inventory_id | UUID |
| quantity | Integer |

---

# Reorder Alerts Table

| Field | Type |
|---|---|
| id | UUID |
| inventory_id | UUID |
| current_quantity | Integer |
| reorder_level | Integer |
| alert_status | String |

---

# Audit Logs Table

| Field | Type |
|---|---|
| id | UUID |
| user_id | UUID |
| action | String |
| timestamp | DateTime |
