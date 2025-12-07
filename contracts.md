# MTC Pro CMMS - Backend Integration Plan

## Current Status
Frontend is fully functional with mock data stored in `mockData.js`. All core modules are implemented and working:
- Authentication (mock login)
- Dashboard with KPIs
- Work Orders management
- Equipment tracking
- Preventive Maintenance scheduling
- Inventory management
- Vendor management
- Purchase Orders
- Reports
- Settings

## Firebase Backend Integration Plan

### 1. Firebase Setup Required
- Firebase Authentication (Email/Password + Google Sign-In)
- Cloud Firestore (NoSQL database)
- Firebase Storage (for equipment images, documents)
- Firebase Cloud Functions (for automations)

### 2. Firestore Collections Schema

```
users/
  - id (string)
  - email (string)
  - name (string)
  - role (string: admin|manager|technician|viewer)
  - createdAt (timestamp)
  - lastLogin (timestamp)

workOrders/
  - id (string)
  - title (string)
  - equipmentId (reference)
  - priority (string: critical|high|medium|low)
  - status (string: open|in-progress|scheduled|completed)
  - assignedTo (string)
  - createdDate (timestamp)
  - dueDate (timestamp)
  - completedDate (timestamp)
  - description (string)
  - type (string: preventive|corrective)
  - estimatedHours (number)
  - actualHours (number)

equipment/
  - id (string)
  - name (string)
  - category (string)
  - manufacturer (string)
  - model (string)
  - serialNumber (string)
  - location (string)
  - status (string: operational|maintenance-required|out-of-service)
  - installDate (timestamp)
  - lastService (timestamp)
  - nextService (timestamp)
  - criticality (string: critical|high|medium|low)
  - imageUrl (string)

preventiveMaintenance/
  - id (string)
  - name (string)
  - equipmentId (reference)
  - frequency (string: daily|weekly|monthly|quarterly|annual)
  - lastCompleted (timestamp)
  - nextDue (timestamp)
  - status (string: scheduled|overdue|completed)
  - tasks (array of strings)

inventory/
  - id (string)
  - partNumber (string)
  - name (string)
  - category (string)
  - quantity (number)
  - reorderLevel (number)
  - reorderQuantity (number)
  - unitCost (number)
  - location (string)
  - supplierId (reference)
  - status (string: in-stock|low-stock|critical|out-of-stock)

vendors/
  - id (string)
  - name (string)
  - contact (string)
  - email (string)
  - phone (string)
  - address (string)
  - category (string)
  - rating (number)
  - status (string: active|inactive)

purchaseOrders/
  - id (string)
  - vendorId (reference)
  - orderDate (timestamp)
  - expectedDate (timestamp)
  - receivedDate (timestamp)
  - status (string: pending|approved|ordered|received|cancelled)
  - total (number)
  - items (array of objects)
```

### 3. Firebase Authentication Flow

**Current Mock:**
- Simple email/password check against hardcoded users
- LocalStorage for session persistence

**Firebase Implementation:**
- `firebase.auth().signInWithEmailAndPassword()`
- `firebase.auth().signInWithPopup(googleProvider)`
- Real-time auth state listener
- Role-based access control using custom claims
- Secure password reset flow

### 4. Frontend Changes Required

**Files to Update:**
1. `/app/frontend/src/context/AuthContext.js`
   - Replace mock authentication with Firebase Auth
   - Implement onAuthStateChanged listener
   - Add role-based permissions

2. Create `/app/frontend/src/firebase/config.js`
   - Firebase initialization
   - Environment variables for config

3. Update all pages to use Firestore queries:
   - Replace `import { data } from '../mockData'` with Firestore queries
   - Implement real-time listeners using `onSnapshot`
   - Add CRUD operations (create, read, update, delete)

4. `/app/frontend/src/pages/Dashboard.js`
   - Fetch dashboard stats from Firestore aggregations
   - Real-time updates for work orders and equipment

5. `/app/frontend/src/pages/WorkOrders.js`
   - CRUD operations with Firestore
   - Real-time sync for work order updates
   - File upload for attachments (Firebase Storage)

6. `/app/frontend/src/pages/Equipment.js`
   - Image upload to Firebase Storage
   - Equipment CRUD operations
   - QR code generation for equipment lookup

7. Other pages (Inventory, Vendors, PurchaseOrders, etc.)
   - Similar Firestore integration pattern

### 5. Firebase Cloud Functions (Automations)

**Triggers to Implement:**
1. **Work Order Notifications**
   - Send email when WO is assigned
   - Send overdue alerts

2. **Preventive Maintenance Scheduler**
   - Auto-create work orders based on PM schedules
   - Update next due dates

3. **Inventory Alerts**
   - Email notifications when stock is low
   - Auto-create purchase orders

4. **Equipment Status Updates**
   - Update equipment status based on work orders
   - Calculate uptime metrics

### 6. Offline Support

**Implementation:**
- Enable Firestore persistence
- Service worker for offline caching
- Queue system for offline operations
- Sync when back online

### 7. Real-time Features

**Firestore Listeners:**
- Dashboard updates in real-time
- Work order status changes
- Equipment alerts
- Inventory level changes
- Multi-user collaboration

### 8. Security Rules

**Firestore Rules:**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own data
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }
    
    // Work orders - role based
    match /workOrders/{orderId} {
      allow read: if request.auth != null;
      allow create: if request.auth.token.role in ['admin', 'manager'];
      allow update: if request.auth.token.role in ['admin', 'manager', 'technician'];
      allow delete: if request.auth.token.role == 'admin';
    }
    
    // Similar rules for other collections
  }
}
```

### 9. Environment Variables Needed

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```

### 10. Migration Steps

**Phase 1: Authentication**
1. Set up Firebase project
2. Enable Authentication (Email/Password, Google)
3. Replace AuthContext with Firebase Auth
4. Test login/logout flow

**Phase 2: Core Data**
1. Set up Firestore collections
2. Migrate work orders to Firestore
3. Migrate equipment data
4. Test CRUD operations

**Phase 3: Advanced Features**
1. Preventive maintenance automation
2. Inventory tracking
3. Purchase orders
4. File uploads (Firebase Storage)

**Phase 4: Notifications & Automation**
1. Deploy Cloud Functions
2. Set up email triggers
3. Implement push notifications
4. Mobile app views

**Phase 5: Testing & Optimization**
1. Comprehensive testing
2. Performance optimization
3. Security rules review
4. User acceptance testing

## Notes

- All mock data in `mockData.js` will be migrated to Firestore
- Current localStorage authentication will be replaced with Firebase Auth
- Real-time sync will make the app collaborative
- Offline support will enable mobile technician use
- Firebase Functions will automate maintenance workflows
