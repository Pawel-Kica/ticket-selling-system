## **Ticket selling system for trains, no transfers**

### **Role based authorization module:**

- Admin – can add and remove users. manages roles. Does not have
  access to any other data
- Manager – has access to any data, book tickets
- Boss – can get reports about trains and time filtering
- Passenger / Default – can access data about empty seats. Ordinary users are
  passengers

### **Routes:**

#### **Unauthenticated user** can:

- Create a new user with default role
- Make a login request or in other words, obtain an authentication token
- Check if the authentication token is valid
- Access data about stations names
- Access data about available prices, filter it by stations, price, and types of carriage/train
- Access data about routes included trains going on particular route and available seats and filter it by stations and date of departure time
- Access data about **specified** route by entering its ID
- Access general data about trains and filter it by route
- Access detailed data (train type, carriages, available seats etc.) about **specified** train

#### **Passenger (default) user** can all above and:

- BUY a new ticket, for **specified** train, carriage, stations and seat
- Access data about his tickets

#### **Boss** can all above and:

- Access data about trains, filtered by:
  - bossId

#### **Manager** can all above and:

- Access data about employees, filter it by:
  - name
  - surname
  - telephone number
  - position (driver/conductor)
- Access data about **specified** employee by entering his ID
- BOOK / BUY a new ticket for specified user, book only before 3 days of departure time
- Access data about created tickets, filter it by:
  - userId
  - routeId
  - trainId
  - carriageId
  - state (booked / bought)

#### **Admin** does not have access to any data, can:

- creates a new user with specified role
- block users
- unblock users
- update roles
- remove specified user
