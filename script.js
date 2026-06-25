import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD96y9HGI0EbaVcp9Vg_e1ZAOcWQyMfipE",
    authDomain: "login-44cff.firebaseapp.com",
    projectId: "login-44cff",
    storageBucket: "login-44cff.firebasestorage.app",
    messagingSenderId: "316207978856",
    appId: "1:316207978856:web:48cd4d25b2b599a35f1edd"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const tamilTranslations = {
    shopName: "ஸ்ரீ கிருஷ்ணா ப்ளூ மெட்டல்ஸ்",
    shopSubtitle: "கட்டிடப் பொருட்கள் விற்பனை",
    enterPassword: "கடவுச்சொல்லை உள்ளிடவும்",
    login: "உள்நுழை",
    logout: "வெளியேறு",
    todayWork: "இன்றைய வேலை நிலை",
    date: "தேதி",
    customerName: "வாடிக்கையாளர் பெயர்",
    enterCustomer: "வாடிக்கையாளர் பெயரை உள்ளிடவும்",
    cementRate: "சிமெண்ட் விலை (₹/bag) - இன்றைய மதிப்பு:",
    cementQty: "சிமெண்ட் (bags) - எவ்வளவு வேண்டும்:",
    cementTotal: "சிமெண்ட் மொத்தம் (₹):",
    jalliRate: "ஜல்லி விலை (₹/ton):",
    jalliQty: "ஜல்லி (tons) - எவ்வளவு வேண்டும்:",
    jalliTotal: "ஜல்லி மொத்தம் (₹):",
    sandRate: "மணல் விலை (₹/ton):",
    sandQty: "மணல் (tons) - எவ்வளவு வேண்டும்:",
    sandTotal: "மணல் மொத்தம் (₹):",
    redBricksQty: "சிவப்பு செங்கல் (pcs) - எவ்வளவு வேண்டும்:",
    redBricksRate: "சிவப்பு செங்கல் விலை (₹/pc):",
    redBricksTotal: "சிவப்பு செங்கல் மொத்தம் (₹):",
    aacType: "AAC வகை:",
    aacRate: "AAC விலை (₹/pc):",
    aacQty: "AAC blocks (pcs) - எவ்வளவு வேண்டும்:",
    aacTotal: "AAC மொத்தம் (₹):",
    totalAmount: "மொத்த தொகை (₹):",
    givenAmount: "கொடுக்கப்பட்ட தொகை (₹):",
    remainingAmount: "மீதமுள்ள தொகை (₹):",
    addPurchase: "பதிவு செய்",
    todayRates: "இன்றைய விலைகள்",
    cement: "சிமெண்ட்",
    jalli: "ஜல்லி",
    sand: "மணல்",
    redBricks: "சிவப்பு செங்கல்",
    aac4inch: "AAC 4 இஞ்ச்",
    aac6inch: "AAC 6 இஞ்ச்",
    aac9inch: "AAC 9 இஞ்ச்",
    aacBlocks: "AAC blocks",
    purchaseSummary: "பதிவு சுருக்கம்",
    previousDay: "முந்தைய நாள் அறிக்கை",
    tomorrowWork: "நாளைய வேலை",
    reports: "அறிக்கைகள்",
    salesReports: "விற்பனை & அறிக்கைகள்",
    todayPurchases: "இன்றைய பதிவுகள்",
    backStatus: "← நிலைக்கு திரும்பு",
    dayStatus: "நாள் அறிக்கை",
    monthlyStatus: "மாத அறிக்கை",
    yearlyStatus: "ஆண்டு அறிக்கை",
    dayReport: "நாள் அறிக்கை",
    monthlyReport: "மாத அறிக்கை",
    yearlyReport: "ஆண்டு அறிக்கை",
    selectDate: "தேதியை தேர்வு செய்க:",
    selectMonth: "மாதத்தை தேர்வு செய்க:",
    selectYear: "ஆண்டை தேர்வு செய்க:",
    generateReport: "அறிக்கை உருவாக்கு",
    downloadPDF: "PDF பதிவிறக்கு",
    daily: "தினசரி",
    monthly: "மாதாந்திர",
    yearly: "ஆண்டாந்திர",
    dailyCement: "தினசரி சிமெண்ட் விற்பனை அறிக்கை",
    monthlyCement: "மாதாந்திர சிமெண்ட் விற்பனை அறிக்கை",
    yearlyCement: "ஆண்டாந்திர சிமெண்ட் விற்பனை அறிக்கை",
    pendingAlert: "நிலுவை வாடிக்கையாளர்கள்",
    checkCustomer: "வாடிக்கையாளர் பெயரை உள்ளிடவும்:",
    check: "சரி பார்க்க",
    pendingReport: "நிலுவை தொகை அறிக்கை",
    close: "மூடு",
    workDesc: "வேலை விளக்கம்:",
    addWork: "வேலை சேர்க்க",
    noPurchasesToday: "இன்று எந்த பதிவும் இல்லை",
    noPurchasesDate: "இந்த தேதியில் பதிவு இல்லை",
    noPurchasesMonth: "இந்த மாதத்தில் பதிவு இல்லை",
    noPurchasesYear: "இந்த ஆண்டில் பதிவு இல்லை",
    total: "மொத்தம்",
    remaining: "மீதம்",
    noPending: "நிலுவை தொகை இல்லை",
    noCritical: "முக்கிய எச்சரிக்கை இல்லை",
    purchaseAdded: "பதிவு வெற்றிகரமாக சேர்க்கப்பட்டது!",
    fillFields: "அனைத்து புலங்களையும் நிரப்பவும்!",
    pdfDownloaded: "PDF வெற்றிகரமாக பதிவிறக்கப்பட்டது!",
    noData: "ஏற்றுமதி செய்ய தரவு இல்லை!",
    invalidPassword: "தவறான கடவுச்சொல்!",
    bags: "bags",
    tons: "tons",
    pcs: "pcs",
    alertPending: "எச்சரிக்கை: வாடிக்கையாளர் '",
    alertPending2: "' இல் நிலுவை தொகை ₹",
    alertPending3: " உள்ளது!",
    critical: "முக்கிய: வாடிக்கையாளர் '",
    critical2: "' இல் நிலுவை ₹",
    critical3: " ",
    critical4: " நாட்கள்! (5 நாட்களைக் கடந்தது)",
    warning: "எச்சரிக்கை: வாடிக்கையாளர் '",
    warning2: "' இல் நிலுவை ₹",
    warning3: " ",
    warning4: " நாட்கள்! (5 நாட்களுக்கு அருகில்)",
    pendingAmount: "நிலுவை தொகை",
    customerPending: "இந்த வாடிக்கையாளருக்கு நிலுவை தொகை இல்லை"
};
const englishTranslations = {
    shopName: "Sri Krishna Blue Metals",
    shopSubtitle: "Construction Materials Sales",
    enterPassword: "Enter Password",
    login: "Login",
    logout: "Logout",
    todayWork: "Today's Work Status",
    date: "Date",
    customerName: "Customer Name",
    enterCustomer: "Enter customer name",
    cementRate: "Cement Rate (₹/bag) - Today's Value:",
    cementQty: "Cement (bags) - How many want:",
    cementTotal: "Cement Total (₹):",
    jalliRate: "Jalli Rate (₹/ton):",
    jalliQty: "Jalli (tons) - How many want:",
    jalliTotal: "Jalli Total (₹):",
    sandRate: "Sand Rate (₹/ton):",
    sandQty: "Sand (tons) - How many want:",
    sandTotal: "Sand Total (₹):",
    redBricksQty: "Red Bricks (pcs) - How many want:",
    redBricksRate: "Red Bricks Rate (₹/pc):",
    redBricksTotal: "Red Bricks Total (₹):",
    aacType: "AAC Type:",
    aacRate: "AAC Rate (₹/pc):",
    aacQty: "AAC blocks (pcs) - How many want:",
    aacTotal: "AAC Total (₹):",
    totalAmount: "Total Amount (₹):",
    givenAmount: "Given Amount (₹):",
    remainingAmount: "Remaining Amount (₹):",
    addPurchase: "Add Purchase",
    todayRates: "Today's Rates",
    cement: "Cement",
    jalli: "Jalli",
    sand: "Sand",
    redBricks: "Red Bricks",
    aac4inch: "AAC 4 Inch",
    aac6inch: "AAC 6 Inch",
    aac9inch: "AAC 9 Inch",
    aacBlocks: "AAC blocks",
    purchaseSummary: "Purchase Summary",
    previousDay: "Previous Day Report",
    tomorrowWork: "Tomorrow Work",
    reports: "Reports",
    salesReports: "Sales & Reports",
    todayPurchases: "Today's Purchases",
    backStatus: "← Back to Status",
    dayStatus: "Day Status",
    monthlyStatus: "Monthly Status",
    yearlyStatus: "Yearly Status",
    dayReport: "Day Report",
    monthlyReport: "Monthly Report",
    yearlyReport: "Yearly Report",
    selectDate: "Select Date:",
    selectMonth: "Select Month:",
    selectYear: "Select Year:",
    generateReport: "Generate Report",
    downloadPDF: "Download PDF",
    daily: "Daily",
    monthly: "Monthly",
    yearly: "Yearly",
    dailyCement: "Daily Cement Sales Report",
    monthlyCement: "Monthly Cement Sales Report",
    yearlyCement: "Yearly Cement Sales Report",
    pendingAlert: "Pending Customers",
    checkCustomer: "Enter Customer Name to Check:",
    check: "Check",
    pendingReport: "Pending Amount Report",
    close: "Close",
    workDesc: "Work Description:",
    addWork: "Add Work",
    noPurchasesToday: "No purchases today",
    noPurchasesDate: "No purchases on this date",
    noPurchasesMonth: "No purchases in this month",
    noPurchasesYear: "No purchases in this year",
    total: "Total",
    remaining: "Remaining",
    noPending: "No pending amounts",
    noCritical: "No critical notifications",
    purchaseAdded: "Purchase added successfully!",
    fillFields: "Please fill all fields!",
    pdfDownloaded: "PDF downloaded successfully!",
    noData: "No data to export!",
    invalidPassword: "Invalid password!",
    bags: "bags",
    tons: "tons",
    pcs: "pcs",
    alertPending: "⚠️ ALERT: Customer '",
    alertPending2: "' has pending amount of ₹",
    alertPending3: "!",
    critical: "🚨 CRITICAL: Customer '",
    critical2: "' has pending ₹",
    critical3: " for ",
    critical4: " days! (Over 5 days)",
    warning: "⚠️ WARNING: Customer '",
    warning2: "' has pending ₹",
    warning3: " for ",
    warning4: " days! (Approaching 5 days)",
    pendingAmount: "Pending Amount",
    customerPending: "No pending amount for this customer"
};
let purchases = JSON.parse(localStorage.getItem('purchases')) || [];
let tomorrowWork = JSON.parse(localStorage.getItem('tomorrowWork')) || [];
let ratesHistory = JSON.parse(localStorage.getItem('ratesHistory')) || [];
let currentLanguage = 'english';

const AAC_RATES = {
    '4inch': 120,
    '6inch': 150,
    '9inch': 200
};
const cement_RATES = {
    'dalmia': 300,
    'ultratech': 300
};
const jalli_RATES = {
    '3/4 jalli': 120,
    '1 1/2 jalli': 150,
    'Chips': 200,
    'Gravel': 200
     
};
const sand_RATES = {
    'M sand': 120,
    'P sand': 150,
    'white M sand': 200,
    'red white M sand': 200
};

window.showPage = function(pageId) {
    //alert("showpage vabthutya");
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
    if (pageId === 'statusPage') 
    {
        updateNotifications();
        displayTodayPurchases();
        updateNotificationCounts();
        updateDisplayRates();
        calculateAll();
        
    }
}

function initializeDashboard() {
    showPage('statusPage');
    //updateNotifications();
   // displayTodayPurchases();
   // updateNotificationCounts();
   // updateDisplayRates();
   // calculateAll();
}

const submitButton = document.getElementById("submit"); // Your Login Button ID
const emailInput = document.getElementById("email");      // Your Email Input ID
const passwordInput = document.getElementById("password"); // Your Password Input ID

if (submitButton) {
    submitButton.addEventListener("click", function() {
       const  email = emailInput.value;
        const password = passwordInput.value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //alert("purila entered");
                const user = userCredential.user;
                //showNotification("Login Successful!", "success");
                //alert("vanthutu entered");
                // TRIGGER THE REDIRECT TO DASHBOARD
                initializeDashboard();
                loadPurchases();
            })
            .catch((error) => {
                console.error(error.message);
                const errorEl = document.getElementById('loginError');
                if(errorEl) {
                    errorEl.textContent = "Invalid Email or Password";
                    errorEl.style.display = 'block';
                }
               // showNotification("Authentication Failed", "error");
            });
    });
}

// 5. SIGN UP INTEGRATION
const createacctbtn = document.getElementById("create-acct-btn");
if (createacctbtn) {
    createacctbtn.addEventListener("click", function() {
        const signupEmail = document.getElementById("email-signup").value;
        const signupPassword = document.getElementById("password-signup").value;
        
        createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
            .then(() => {
                window.alert("Success! Account created. You can now login.");
                showPage('loginPage');
            })
            .catch((err) => window.alert(err.message));
    });
}


window.logout = function() {
    auth.signOut().then(() => {
        showPage('loginPage');
        if(emailInput) emailInput.value = '';
        if(passwordInput) passwordInput.value = '';
        alert("Logged out", "success");
    });
};
//function showPendingReport() {
    window.showPendingReport = function() {
    const pendingPurchases = purchases.filter(p => p.remainingAmount > 0);
    const container = document.getElementById('pendingReportContent');
    if (!container) return;

    if (pendingPurchases.length === 0) {
        container.innerHTML =
            `<p style="color:#666;text-align:center;">No Pending Customers</p>`;
    } else {

        const totalPending = pendingPurchases.reduce(
            (sum, p) => sum + p.remainingAmount,
            0
        );

        container.innerHTML = `
            <div style="background:#fff3cd;padding:15px;border-radius:10px;margin-bottom:20px;">
                <h3 style="color:#e67e22;">Pending Amount</h3>
                <p style="font-size:18px;font-weight:700;color:#e74c3c;">
                    Total : ₹${totalPending}
                </p>
            </div>

            <table class="report-table">
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Date</th>
                         <th>Mobile</th>
                        <th>Delivery Place</th>
                        <th>Total</th>
                        <th>Given</th>
                        <th>Remaining</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    ${pendingPurchases.map(p => `
                        <tr>
                            <td>${p.customerName}</td>
                            <td>${p.date}</td>
                            <td>${p.customerMobile}</td>
                            <td>${p.deliveryPlace}</td>
                            <td>₹${p.totalAmount}</td>
                            <td>₹${p.givenAmount}</td>
                            <td style="color:red;font-weight:bold;">
                                ₹${p.remainingAmount}
                            </td>

                            <td>
                                <button
                                    class="clear-btn"
                                    onclick="receivePending(${p.id})">
                                    Receive Amount
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    document.getElementById('pendingReportModal').classList.remove('hidden');
}

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('hidden');
}

window.calculateAll = function() {

    let totalAmount = 0;
   alert("calculate vanthuta");
    // Cement
    document.querySelectorAll('.cement-row').forEach(row => {
        const rate = Number(row.querySelector('.cementRate').value || 0);
        const qty = Number(row.querySelector('.cementQty').value || 0);
        const total = rate * qty;

        row.querySelector('.cementTotal').value = total;
        totalAmount += total;
    });
//alert("cement vanthuta");
    // Jalli
    document.querySelectorAll('.jalli-row').forEach(row => {
        const rate = Number(row.querySelector('.jalliRate').value || 0);
        const qty = Number(row.querySelector('.jalliQty').value || 0);
        const total = rate * qty;

        row.querySelector('.jalliTotal').value = total;
        totalAmount += total;
    });

    // Sand
    document.querySelectorAll('.sand-row').forEach(row => {
        const rate = Number(row.querySelector('.sandRate').value || 0);
        const qty = Number(row.querySelector('.sandQty').value || 0);
        const total = rate * qty;

        row.querySelector('.sandTotal').value = total;
        totalAmount += total;
    });

    // AAC
    document.querySelectorAll('.aac-row').forEach(row => {
        const rate = Number(row.querySelector('.aacRate').value || 0);
        const qty = Number(row.querySelector('.aacQty').value || 0);
        const total = rate * qty;

        row.querySelector('.aacTotal').value = total;
        totalAmount += total;
    });
       
    // Red Bricks
      document.querySelectorAll('.redBricks-row').forEach(row => {
        const rate = Number(row.querySelector('.redBricksRate').value || 0);
        const qty = Number(row.querySelector('.redBricksQty').value || 0);
        const total = rate * qty;

        row.querySelector('.redBricksTotal').value = total;
        totalAmount += total;
    });

    // Final Total
    document.getElementById('totalAmount').value =
        totalAmount;

    const givenAmount =
        Number(document.getElementById('givenAmount').value || 0);

    document.getElementById('remainingAmount').value =
        totalAmount - givenAmount;
}



window.addPurchase = async function() {
    //alert("addpurchase");
    const customerName = document.getElementById('customerName').value.trim();
    if (!customerName) {
        alert("Please enter customer name");
        document.getElementById('customerName').focus();
        return;
    }
    const date = document.getElementById('purchaseDate').value;

    if (!date) {
        alert("Please select date");
        return;
    }
    const customerMobile =
 document.getElementById('customerMobile').value;

const deliveryPlace =
document.getElementById('deliveryPlace').value;

const paymentMethod =
document.getElementById('paymentMethod').value;

    let cementItems = [];
    let jalliItems = [];
    let sandItems = [];
    let aacItems = [];
    let redBricksItems = [];

    let totalAmount = 0;

    // Cement
    document.querySelectorAll('.cement-row').forEach(row => {
        const type = row.querySelector('.cementType').value;
        const rate = Number(row.querySelector('.cementRate').value || 0);
        const qty = Number(row.querySelector('.cementQty').value || 0);
        const total = rate * qty;

        if (qty > 0) {
            cementItems.push({ type, rate, qty, total });
            totalAmount += total;
        }
    });

    // Jalli
    document.querySelectorAll('.jalli-row').forEach(row => {
        const type = row.querySelector('.jalliType').value;
        const rate = Number(row.querySelector('.jalliRate').value || 0);
        const qty = Number(row.querySelector('.jalliQty').value || 0);
        const total = rate * qty;

        if (qty > 0) {
            jalliItems.push({ type, rate, qty, total });
            totalAmount += total;
        }
    });

    // Sand
    document.querySelectorAll('.sand-row').forEach(row => {
        const type = row.querySelector('.sandType').value;
        const rate = Number(row.querySelector('.sandRate').value || 0);
        const qty = Number(row.querySelector('.sandQty').value || 0);
        const total = rate * qty;

        if (qty > 0) {
            sandItems.push({ type, rate, qty, total });
            totalAmount += total;
        }
    });

    // AAC Blocks
    document.querySelectorAll('.aac-row').forEach(row => {
        const type = row.querySelector('.aacType').value;
        const rate = Number(row.querySelector('.aacRate').value || 0);
        const qty = Number(row.querySelector('.aacQty').value || 0);
        const total = rate * qty;

        if (qty > 0) {
            aacItems.push({ type, rate, qty, total });
            totalAmount += total;
        }
    });

    // Red Bricks
    document.querySelectorAll('.redBricks-row').forEach(row => {
        const type = row.querySelector('.redBricksType').value;
        const rate = Number(row.querySelector('.redBricksRate').value || 0);
        const qty = Number(row.querySelector('.redBricksQty').value || 0);
        const total = rate * qty;

        if (qty > 0) {
            redBricksItems.push({ type, rate, qty, total });
            totalAmount += total;
        }
    });

    const givenAmount =
        Number(document.getElementById('givenAmount').value || 0);

    const remainingAmount =
        totalAmount - givenAmount;

    const purchase = {
        id: Date.now(),
        customerName,
        date,
         customerMobile,
         deliveryPlace,
         paymentMethod,
        cementItems,
        jalliItems,
        sandItems,
        aacItems,
        redBricksItems,
        totalAmount,
        givenAmount,
        remainingAmount
    };

   purchases.push(purchase);

// Local backup
localStorage.setItem(
    'purchases',
    JSON.stringify(purchases)
);

// Firebase server save
try {

    await addDoc(
        collection(db, "purchases"),
        purchase
    );

    console.log("Saved to Firebase");

} catch(error) {

    console.error("Firebase Save Error:", error);

}

    alert("Purchase Added Successfully");

    document.getElementById('customerName').value = '';
    document.getElementById('givenAmount').value = '';
    document.getElementById('customerMobile').value = '';
    document.getElementById('deliveryPlace').value = '';
    document.getElementById('paymentMethod').value = '';
    
    // Clear all quantity and rate fields
document.querySelectorAll('.cementRate, .cementQty').forEach(el => el.value = '');
document.querySelectorAll('.jalliRate, .jalliQty').forEach(el => el.value = '');
document.querySelectorAll('.sandRate, .sandQty').forEach(el => el.value = '');
document.querySelectorAll('.aacRate, .aacQty').forEach(el => el.value = '');
document.querySelectorAll('.redBricksRate, .redBricksQty').forEach(el => el.value = '');

    
    calculateAll();
    updateNotifications();
    displayTodayPurchases();
    updateNotificationCounts();
}

window.editPurchase =function(id) {

const purchase = purchases.find(p => p.id === id);

if (!purchase) return;

document.getElementById('customerName').value = purchase.customerName;
document.getElementById('purchaseDate').value = purchase.date;
 document.getElementById('customerMobile').value = purchase.customerMobile;
document.getElementById('deliveryPlace').value = purchase.deliveryPlace;
 document.getElementById('paymentMethod').value = purchase.paymentMethod;
document.getElementById('givenAmount').value = purchase.givenAmount || 0;

// Cement
if (purchase.cementItems && purchase.cementItems.length > 0) {
    const row = document.querySelector('.cement-row');
    row.querySelector('.cementType').value = purchase.cementItems[0].type;
    row.querySelector('.cementRate').value = purchase.cementItems[0].rate;
    row.querySelector('.cementQty').value = purchase.cementItems[0].qty;
}

// Jalli
if (purchase.jalliItems && purchase.jalliItems.length > 0) {
    const row = document.querySelector('.jalli-row');
    row.querySelector('.jalliType').value = purchase.jalliItems[0].type;
    row.querySelector('.jalliRate').value = purchase.jalliItems[0].rate;
    row.querySelector('.jalliQty').value = purchase.jalliItems[0].qty;
}

// Sand
if (purchase.sandItems && purchase.sandItems.length > 0) {
    const row = document.querySelector('.sand-row');
    row.querySelector('.sandType').value = purchase.sandItems[0].type;
    row.querySelector('.sandRate').value = purchase.sandItems[0].rate;
    row.querySelector('.sandQty').value = purchase.sandItems[0].qty;
}

// AAC
if (purchase.aacItems && purchase.aacItems.length > 0) {
    const row = document.querySelector('.aac-row');
    row.querySelector('.aacType').value = purchase.aacItems[0].type;
    row.querySelector('.aacRate').value = purchase.aacItems[0].rate;
    row.querySelector('.aacQty').value = purchase.aacItems[0].qty;
}

// Red Bricks
if (purchase.redBricksItems && purchase.redBricksItems.length > 0) {
    const row = document.querySelector('.redBricks-row');
    row.querySelector('.redBricksType').value = purchase.redBricksItems[0].type;
    row.querySelector('.redBricksRate').value = purchase.redBricksItems[0].rate;
    row.querySelector('.redBricksQty').value = purchase.redBricksItems[0].qty;
}

calculateAll();

purchases = purchases.filter(p => p.id !== id);
localStorage.setItem('purchases', JSON.stringify(purchases));

displayTodayPurchases();

alert("Purchase loaded for editing. Update values and click Add Purchase.");

}

window.addCementRow =function() {
    //alert("hellooo");
    const row = document.querySelector('.cement-row').cloneNode(true);

    row.querySelector('.cementRate').value = '';
    row.querySelector('.cementQty').value = '';
    row.querySelector('.cementTotal').value = '';

    document.getElementById('cementContainer').appendChild(row);

}
window. addJalliRow=function() {

    const row = document.querySelector('.jalli-row').cloneNode(true);

    row.querySelector('.jalliRate').value = '';
    row.querySelector('.jalliQty').value = '';
    row.querySelector('.jalliTotal').value = '';

    document.getElementById('jalliContainer').appendChild(row);

}
window.addSandRow=function() {

    const row = document.querySelector('.sand-row').cloneNode(true);

    row.querySelector('.sandRate').value = '';
    row.querySelector('.sandQty').value = '';
    row.querySelector('.sandTotal').value = '';

    document.getElementById('sandContainer').appendChild(row);

}
window.addAACRow =function() {
     
    const row = document.querySelector('.aac-row').cloneNode(true);

    row.querySelector('.aacRate').value = '';
    row.querySelector('.aacQty').value = '';
    row.querySelector('.aacTotal').value = '';

    document.getElementById('aacContainer').appendChild(row);

}
window. addredBricksRow =function() {
    
    const row = document.querySelector('.redBricks-row').cloneNode(true);

    row.querySelector('.redBricksRate').value = '';
    row.querySelector('.redBricksQty').value = '';
    row.querySelector('.redBricksTotal').value = '';

    document.getElementById('redBricksContainer').appendChild(row);

}

window. displayTodayPurchases =function() {
    const today = new Date().toISOString().split('T')[0];
    const todayPurchases = purchases.filter(p => p.date === today);
    const container = document.getElementById('todayPurchases');

    if (todayPurchases.length === 0) {
        container.innerHTML =
            `<p style="color:#666;text-align:center;">${getTranslation('noPurchasesToday')}</p>`;
        return;
    }
    container.innerHTML = todayPurchases.map(p => {

        let materialsHtml = '';

        p.cementItems?.forEach(item => {
            materialsHtml += `
                <p>Cement (${item.type}) :
                ${item.qty} × ₹${item.rate}
                = ₹${item.total}</p>`;
        });

        p.jalliItems?.forEach(item => {
            materialsHtml += `
                <p>Jalli (${item.type}) :
                ${item.qty} × ₹${item.rate}
                = ₹${item.total}</p>`;
        });

        p.sandItems?.forEach(item => {
            materialsHtml += `
                <p>Sand (${item.type}) :
                ${item.qty} × ₹${item.rate}
                = ₹${item.total}</p>`;
        });

        p.aacItems?.forEach(item => {
            materialsHtml += `
                <p>AAC (${item.type}) :
                ${item.qty} × ₹${item.rate}
                = ₹${item.total}</p>`;
        });

        p.redBricksItems?.forEach(item => {
            materialsHtml += `
                <p>Red Bricks (${item.type}) :
                ${item.qty} × ₹${item.rate}
                = ₹${item.total}</p>`;
        });

        return `
        <div class="purchase-item ${p.remainingAmount > 0 ? 'pending' : ''}">
            <h3>${p.customerName}</h3>
            <p>Date : ${p.date}</p>
             <p><b>Mobile:</b>${p.customerMobile}</p>
             <p><b>Delivery Place:</b>${p.deliveryPlace}</p>
             <p><b>Payment:</b>${p.paymentMethod}</p>

            ${materialsHtml}

            <p class="amount">
                Total : ₹${p.totalAmount}
                | Given : ₹${p.givenAmount}
            </p>

            ${p.remainingAmount > 0
                ? `<p class="pending-amount">Remaining : ₹${p.remainingAmount} ⚠️</p>`
                : ''}

            <button onclick="editPurchase(${p.id})" class="edit-btn">
                Edit Purchase
            </button>
        </div>`;
    }).join('');
}
window.showPreviousDayReport =function() {
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayDate = yesterday.toISOString().split('T')[0];

    const data = purchases.filter(p => p.date === yesterdayDate);

    const container = document.getElementById('previousDayContent');

    if (!container) return;
    
    if (data.length === 0) {
        
      container.innerHTML = `
            <p style="color:#666;text-align:center;">
                ${getTranslation('noPurchasesDate')}
            </p>
        `;

    } else {

        const totalAmount = data.reduce(
            (sum, p) => sum + Number(p.totalAmount || 0),
            0
        );

        const totalGiven = data.reduce(
            (sum, p) => sum + Number(p.givenAmount || 0),
            0
        );

        const totalRemaining = data.reduce(
            (sum, p) => sum + Number(p.remainingAmount || 0),
            0
        );

        const cashTotal = data
            .filter(p => p.paymentMode === 'Cash')
            .reduce((sum, p) => sum + Number(p.givenAmount || 0), 0);

        const gpayTotal = data
            .filter(p => p.paymentMode === 'GPay')
            .reduce((sum, p) => sum + Number(p.givenAmount || 0), 0);

        const phonePeTotal = data
            .filter(p => p.paymentMode === 'PhonePe')
            .reduce((sum, p) => sum + Number(p.givenAmount || 0), 0);

        container.innerHTML = `

            <div style="
                background:#f8f9fa;
                padding:15px;
                border-radius:10px;
                margin-bottom:20px;
            ">
                <h3 style="margin-bottom:10px;">
                    Payment Summary
                </h3>

                <div style="
                    display:flex;
                    gap:15px;
                    flex-wrap:wrap;
                    font-weight:600;
                ">
                    <span>Cash: ₹${cashTotal.toFixed(2)}</span>
                    <span>GPay: ₹${gpayTotal.toFixed(2)}</span>
                    <span>PhonePe: ₹${phonePeTotal.toFixed(2)}</span>
                </div>
            </div>

            <div style="overflow-x:auto;">

                <table class="report-table">

                    <thead>
                        <tr>
                            <th>${getTranslation('customerName')}</th>
                            <th>Mobile</th>
                            <th>Delivery Place</th>
                            <th>Payment</th>
                            <th>${getTranslation('cement')}</th>
                            <th>${getTranslation('jalli')}</th>
                            <th>${getTranslation('sand')}</th>
                            <th>${getTranslation('redBricks')}</th>
                            <th>${getTranslation('aacBlocks')}</th>
                            <th>${getTranslation('totalAmount')}</th>
                            <th>${getTranslation('givenAmount')}</th>
                            <th>${getTranslation('remainingAmount')}</th>
                        </tr>
                    </thead>

                    <tbody>

                        ${data.map(p => `

                            <tr>

                                <td>${p.customerName}</td>

                                <td>${p.customerMobile || '-'}</td>

                                <td>${p.deliveryPlace || '-'}</td>

                                <td>${p.paymentMode || 'Cash'}</td>

                                <td>
                                    ${(p.cementItems || [])
                                        .map(item =>
                                            `${item.type} (${item.qty})`
                                        )
                                        .join('<br>')}
                                </td>

                                <td>
                                    ${(p.jalliItems || [])
                                        .map(item =>
                                            `${item.type} (${item.qty})`
                                        )
                                        .join('<br>')}
                                </td>

                                <td>
                                    ${(p.sandItems || [])
                                        .map(item =>
                                            `${item.type} (${item.qty})`
                                        )
                                        .join('<br>')}
                                </td>

                                <td>
                                    ${(p.redBricksItems || [])
                                        .map(item =>
                                            `${item.type} (${item.qty})`
                                        )
                                        .join('<br>')}
                                </td>

                                <td>
                                    ${(p.aacItems || [])
                                        .map(item =>
                                            `${item.type} (${item.qty})`
                                        )
                                        .join('<br>')}
                                </td>

                                <td>
                                    ₹${Number(p.totalAmount || 0).toFixed(2)}
                                </td>

                                <td>
                                    ₹${Number(p.givenAmount || 0).toFixed(2)}
                                </td>

                                <td style="
                                    color:${p.remainingAmount > 0 ? '#e74c3c' : '#27ae60'};
                                    font-weight:600;
                                ">
                                    ₹${Number(p.remainingAmount || 0).toFixed(2)}
                                </td>

                            </tr>

                        `).join('')}

                        <tr class="total-row">

                            <td><strong>${getTranslation('total')}</strong></td>

                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>

                            <td>
                                <strong>₹${totalAmount.toFixed(2)}</strong>
                            </td>

                            <td>
                                <strong>₹${totalGiven.toFixed(2)}</strong>
                            </td>

                            <td>
                                <strong>₹${totalRemaining.toFixed(2)}</strong>
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>
        `;
    }
    document
        .getElementById('previousDayModal')
        .classList.remove('hidden')
    
}
window.receivePending = function(id) {

    const amount = parseFloat(
        prompt("Enter received amount")
    );

    if (!amount || amount <= 0) {
        return;
    }

    const purchase = purchases.find(p => p.id === id);

    if (!purchase) return;

    purchase.givenAmount += amount;

    purchase.remainingAmount =
        purchase.totalAmount - purchase.givenAmount;

    if (purchase.remainingAmount <= 0) {
        purchase.remainingAmount = 0;
        alert("Customer removed from pending list");
    }

    localStorage.setItem(
        'purchases',
        JSON.stringify(purchases)
    );

    updateNotificationCounts();
    updateNotifications();
    displayTodayPurchases();
    showPendingReport();
}

window.checkPendingCustomer = function()
       {
    const customerInput = document.getElementById('checkCustomerName');
    const alertDiv = document.getElementById('pendingAlert');
    const listDiv = document.getElementById('pendingCustomersList');

    if (!customerInput || !listDiv) {
        console.error('Missing required elements: checkCustomerName or pendingCustomersList');
        return;
    }

    const customerName = customerInput.value.trim().toLowerCase();

    if (!customerName) {
        showNotification(getTranslation('fillFields'), 'error');
        return;
    }

    const safePurchases = Array.isArray(purchases) ? purchases : [];

    const pendingPurchases = safePurchases.filter(p => {
        const name = (p.customerName || '').trim().toLowerCase();
        const remaining = Number(p.remainingAmount || 0);
        return name === customerName && remaining > 0;
    });

    if (pendingPurchases.length === 0) {
        if (alertDiv) alertDiv.style.display = 'none';
        listDiv.innerHTML = `
            <p style="color:#27ae60;text-align:center;">
                No Pending Amount
            </p>
        `;
        return;
    }

    const totalPending = pendingPurchases.reduce(
        (sum, p) => sum + Number(p.remainingAmount || 0),
        0
    );

    if (alertDiv) {
        alertDiv.style.display = 'block';
        alertDiv.innerHTML = `
            Pending Amount for
            <strong>${customerInput.value.trim()}</strong>
            :
            <strong>₹${totalPending.toFixed(2)}</strong>
        `;
    }

    const renderItems = (items, label, unit) => {
        return (Array.isArray(items) ? items : []).map(item => `
            <p>
                <strong>${label}</strong>
                (${item.type || '-'})
                :
                ${Number(item.qty || 0)} ${unit}
                × ₹${Number(item.rate || 0)}
                = ₹${Number(item.total || 0)}
            </p>
        `).join('');
    };

    listDiv.innerHTML = pendingPurchases.map(p => `
        <div class="purchase-item pending">
            <h3>${p.customerName || '-'}</h3>

            <p><strong>Date:</strong> ${p.date || '-'}</p>
            <p><strong>📞 Mobile:</strong> ${p.customerMobile || '-'}</p>
            <p><strong>📍 Delivery Place:</strong> ${p.deliveryPlace || '-'}</p>
            <p><strong>💳 Payment Mode:</strong> ${p.paymentMethod || 'Cash'}</p>

            <hr style="margin:10px 0;opacity:0.2;">

            ${renderItems(p.cementItems, 'Cement', 'Bags')}
            ${renderItems(p.jalliItems, 'Jalli', 'Tons')}
            ${renderItems(p.sandItems, 'Sand', 'Tons')}
            ${renderItems(p.redBricksItems, 'Red Bricks', 'Pcs')}
            ${renderItems(p.aacItems, 'AAC Blocks', 'Pcs')}

            <hr style="margin:10px 0;opacity:0.2;">

            <p class="amount"><strong>Total:</strong> ₹${Number(p.totalAmount || 0).toFixed(2)}</p>
            <p class="amount"><strong>Given:</strong> ₹${Number(p.givenAmount || 0).toFixed(2)}</p>
            <p class="pending-amount"><strong>Remaining:</strong> ₹${Number(p.remainingAmount || 0).toFixed(2)}</p>
        </div>
    `).join('');
           //document.getElementById('pendingCustomersList').classList.remove('hidden');
}

window.showDayReport = function() {
    document.querySelectorAll('.report-section').forEach(s => s.classList.add('hidden'));
    document.getElementById('dayReport').classList.remove('hidden');
    document.querySelectorAll('.report-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-tab="day"]').classList.add('active');
}

window.showMonthlyReport = function() {
    document.querySelectorAll('.report-section').forEach(s => s.classList.add('hidden'));
    document.getElementById('monthlyReport').classList.remove('hidden');
    document.querySelectorAll('.report-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-tab="monthly"]').classList.add('active');
}

window. showYearlyReport = function() {
    document.querySelectorAll('.report-section').forEach(s => s.classList.add('hidden'));
    document.getElementById('yearlyReport').classList.remove('hidden');
    document.querySelectorAll('.report-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-tab="yearly"]').classList.add('active');
}

window.getTotalQty =function(items) {
    if (!items) return 0;

    return items.reduce((sum, item) => {
        return sum + Number(item.qty || 0);
    }, 0);
}

window.generateDayReport =function() {
    
    const dateInput = document.getElementById('dayReportDate');
    const container = document.getElementById('dayReportContent');

    if (!dateInput || !container) return;

    const date = dateInput.value;
    const data = Array.isArray(purchases) ? purchases.filter(p => p.date === date) : [];

    if (data.length === 0) {
        container.innerHTML = `
            <p style="color:#666;text-align:center;">
                ${getTranslation('noPurchasesDate')}
            </p>
        `;
        return;
    }

    const totalAmount = data.reduce((sum, p) => sum + Number(p.totalAmount || 0), 0);
    const totalGiven = data.reduce((sum, p) => sum + Number(p.givenAmount || 0), 0);
    const totalRemaining = data.reduce((sum, p) => sum + Number(p.remainingAmount || 0), 0);

    const cementSummary = {};
    const sandSummary = {};
    const jalliSummary = {};
    const aacSummary = {};
    const redBricksSummary = {};

    data.forEach(p => {
        (p.cementItems || []).forEach(item => {
            if (!cementSummary[item.type]) cementSummary[item.type] = { qty: 0, amount: 0 };
            cementSummary[item.type].qty += Number(item.qty || 0);
            cementSummary[item.type].amount += Number(item.total || 0);
        });

        (p.sandItems || []).forEach(item => {
            if (!sandSummary[item.type]) sandSummary[item.type] = { qty: 0, amount: 0 };
            sandSummary[item.type].qty += Number(item.qty || 0);
            sandSummary[item.type].amount += Number(item.total || 0);
        });

        (p.jalliItems || []).forEach(item => {
            if (!jalliSummary[item.type]) jalliSummary[item.type] = { qty: 0, amount: 0 };
            jalliSummary[item.type].qty += Number(item.qty || 0);
            jalliSummary[item.type].amount += Number(item.total || 0);
        });

        (p.aacItems || []).forEach(item => {
            if (!aacSummary[item.type]) aacSummary[item.type] = { qty: 0, amount: 0 };
            aacSummary[item.type].qty += Number(item.qty || 0);
            aacSummary[item.type].amount += Number(item.total || 0);
        });

        (p.redBricksItems || []).forEach(item => {
            if (!redBricksSummary[item.type]) redBricksSummary[item.type] = { qty: 0, amount: 0 };
            redBricksSummary[item.type].qty += Number(item.qty || 0);
            redBricksSummary[item.type].amount += Number(item.total || 0);
        });
    });

    container.innerHTML = `
        <div class="report-summary">
            <h3>Cement Summary</h3>
            ${Object.entries(cementSummary).map(([type, d]) =>
                `<p>${type} - Qty: ${d.qty} - Amount: ₹${d.amount}</p>`
            ).join('')}
            <h3>Sand Summary</h3>
            ${Object.entries(sandSummary).map(([type, d]) =>
                `<p>${type} - Qty: ${d.qty} - Amount: ₹${d.amount}</p>`
            ).join('')}

            <h3>Jalli Summary</h3>
            ${Object.entries(jalliSummary).map(([type, d]) =>
                `<p>${type} - Qty: ${d.qty} - Amount: ₹${d.amount}</p>`
            ).join('')}

            <h3>AAC Blocks Summary</h3>
            ${Object.entries(aacSummary).map(([type, d]) =>
                `<p>${type} - Qty: ${d.qty} - Amount: ₹${d.amount}</p>`
            ).join('')}

            <h3>Red Bricks Summary</h3>
            ${Object.entries(redBricksSummary).map(([type, d]) =>
                `<p>${type} - Qty: ${d.qty} - Amount: ₹${d.amount}</p>`
            ).join('')}
        </div>

        <table class="report-table">
            <thead>
                <tr>
                    <th>${getTranslation('customerName')}</th>
                    <th>Mobile Number</th>
                    <th>Delivery Place</th>
                    <th>Payment Method</th>
                    <th>${getTranslation('totalAmount')}</th>
                    <th>${getTranslation('givenAmount')}</th>
                    <th>${getTranslation('remainingAmount')}</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(p => `
                    <tr>
                        <td>${p.customerName || '-'}</td>
                        <td>${p.customerMobile || '-'}</td>
                        <td>${p.deliveryPlace || '-'}</td>
                        <td>${p.paymentMethod || 'Cash'}</td>
                        <td>₹${Number(p.totalAmount || 0).toFixed(2)}</td>
                        <td>₹${Number(p.givenAmount || 0).toFixed(2)}</td>
                        <td>₹${Number(p.remainingAmount || 0).toFixed(2)}</td>
                    </tr>
                `).join('')}

                <tr class="total-row">
                    <td><strong>${getTranslation('total')}</strong></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><strong>₹${totalAmount.toFixed(2)}</strong></td>
                    <td><strong>₹${totalGiven.toFixed(2)}</strong></td>
                    <td><strong>₹${totalRemaining.toFixed(2)}</strong></td>
                </tr>
            </tbody>
        </table>
    `;
}
window. generateMonthlyReport = function() {
    const monthInput = document.getElementById('monthlyReportMonth');
    const container = document.getElementById('monthlyReportContent');

    if (!monthInput || !container) return;

    const month = monthInput.value;
    const safePurchases = Array.isArray(purchases) ? purchases : [];
    const data = safePurchases.filter(p => (p.date || '').startsWith(month));

    if (data.length === 0) {
        container.innerHTML = `
            <p style="color:#666;text-align:center;">
                ${getTranslation('noPurchasesMonth')}
            </p>
        `;
        return;
    }

    const totalAmount = data.reduce((sum, p) => sum + Number(p.totalAmount || 0), 0);
    const totalGiven = data.reduce((sum, p) => sum + Number(p.givenAmount || 0), 0);
    const totalRemaining = data.reduce((sum, p) => sum + Number(p.remainingAmount || 0), 0);

    const cementSummary = {};
    const sandSummary = {};
    const jalliSummary = {};
    const aacSummary = {};
    const redBricksSummary = {};

    data.forEach(p => {
        (p.cementItems || []).forEach(item => {
            if (!cementSummary[item.type]) cementSummary[item.type] = { qty: 0, amount: 0 };
            cementSummary[item.type].qty += Number(item.qty || 0);
            cementSummary[item.type].amount += Number(item.total || 0);
        });

        (p.sandItems || []).forEach(item => {
            if (!sandSummary[item.type]) sandSummary[item.type] = { qty: 0, amount: 0 };
            sandSummary[item.type].qty += Number(item.qty || 0);
            sandSummary[item.type].amount += Number(item.total || 0);
        });

        (p.jalliItems || []).forEach(item => {
            if (!jalliSummary[item.type]) jalliSummary[item.type] = { qty: 0, amount: 0 };
            jalliSummary[item.type].qty += Number(item.qty || 0);
            jalliSummary[item.type].amount += Number(item.total || 0);
        });

        (p.aacItems || []).forEach(item => {
            if (!aacSummary[item.type]) aacSummary[item.type] = { qty: 0, amount: 0 };
            aacSummary[item.type].qty += Number(item.qty || 0);
            aacSummary[item.type].amount += Number(item.total || 0);
        });

        (p.redBricksItems || []).forEach(item => {
            if (!redBricksSummary[item.type]) redBricksSummary[item.type] = { qty: 0, amount: 0 };
            redBricksSummary[item.type].qty += Number(item.qty || 0);
            redBricksSummary[item.type].amount += Number(item.total || 0);
        });
    });

    container.innerHTML = `
        <div class="report-summary">
            <h3>Cement Monthly Summary</h3>
            ${Object.entries(cementSummary).map(([type, d]) =>
                `<p>${type} - Qty: ${d.qty} - Amount: ₹${Number(d.amount).toFixed(2)}</p>`
            ).join('')}

            <h3>Sand Monthly Summary</h3>
            ${Object.entries(sandSummary).map(([type, d]) =>
                `<p>${type} - Qty: ${d.qty} - Amount: ₹${Number(d.amount).toFixed(2)}</p>`
            ).join('')}

            <h3>Jalli Monthly Summary</h3>
            ${Object.entries(jalliSummary).map(([type, d]) =>
                `<p>${type} - Qty: ${d.qty} - Amount: ₹${Number(d.amount).toFixed(2)}</p>`
            ).join('')}

            <h3>AAC Blocks Monthly Summary</h3>
            ${Object.entries(aacSummary).map(([type, d]) =>
                `<p>${type} - Qty: ${d.qty} - Amount: ₹${Number(d.amount).toFixed(2)}</p>`
            ).join('')}

            <h3>Red Bricks Monthly Summary</h3>
            ${Object.entries(redBricksSummary).map(([type, d]) =>
                `<p>${type} - Qty: ${d.qty} - Amount: ₹${Number(d.amount).toFixed(2)}</p>`
            ).join('')}
        </div>

        <table class="report-table">
            <thead>
                <tr>
                    <th>${getTranslation('customerName')}</th>
                    <th>Mobile Number</th>
                    <th>Delivery Place</th>
                    <th>Payment Method</th>
                    <th>${getTranslation('date')}</th>
                    <th>${getTranslation('totalAmount')}</th>
                    <th>${getTranslation('givenAmount')}</th>
                    <th>${getTranslation('remainingAmount')}</th>
                </tr>
            </thead>

            <tbody>
                ${data.map(p => `
                    <tr>
                        <td>${p.customerName || '-'}</td>
                        <td>${p.customerMobile || '-'}</td>
                        <td>${p.deliveryPlace || '-'}</td>
                        <td>${p.paymentMethod || 'Cash'}</td>
                        <td>${p.date || '-'}</td>
                        <td>₹${Number(p.totalAmount || 0).toFixed(2)}</td>
                        <td>₹${Number(p.givenAmount || 0).toFixed(2)}</td>
                        <td>₹${Number(p.remainingAmount || 0).toFixed(2)}</td>
                    </tr>
                `).join('')}

                <tr class="total-row">
                    <td><strong>${getTranslation('total')}</strong></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><strong>₹${totalAmount.toFixed(2)}</strong></td>
                    <td><strong>₹${totalGiven.toFixed(2)}</strong></td>
                    <td><strong>₹${totalRemaining.toFixed(2)}</strong></td>
                </tr>
            </tbody>
        </table>
    `;
}
window.generateYearlyReport  =function() {
    const yearInput = document.getElementById('yearlyReportYear');
    const container = document.getElementById('yearlyReportContent');

    if (!yearInput || !container) return;

    const year = yearInput.value;
    const safePurchases = Array.isArray(purchases) ? purchases : [];
    const data = safePurchases.filter(p => (p.date || '').startsWith(year));

    if (data.length === 0) {
        container.innerHTML = `
            <p style="color:#666;text-align:center;">
                ${getTranslation('noPurchasesYear')}
            </p>
        `;
        return;
    }

    const totalAmount = data.reduce((sum, p) => sum + Number(p.totalAmount || 0), 0);
    const totalGiven = data.reduce((sum, p) => sum + Number(p.givenAmount || 0), 0);
    const totalRemaining = data.reduce((sum, p) => sum + Number(p.remainingAmount || 0), 0);

    const cementSummary = {};
    const sandSummary = {};
    const jalliSummary = {};
    const aacSummary = {};
    const redBricksSummary = {};

    data.forEach(p => {
        (p.cementItems || []).forEach(item => {
            if (!cementSummary[item.type]) {
                cementSummary[item.type] = { qty: 0, amount: 0 };
            }
            cementSummary[item.type].qty += Number(item.qty || 0);
            cementSummary[item.type].amount += Number(item.total || 0);
        });

        (p.sandItems || []).forEach(item => {
            if (!sandSummary[item.type]) {
                sandSummary[item.type] = { qty: 0, amount: 0 };
            }
            sandSummary[item.type].qty += Number(item.qty || 0);
            sandSummary[item.type].amount += Number(item.total || 0);
        });

        (p.jalliItems || []).forEach(item => {
            if (!jalliSummary[item.type]) {
                jalliSummary[item.type] = { qty: 0, amount: 0 };
            }
            jalliSummary[item.type].qty += Number(item.qty || 0);
            jalliSummary[item.type].amount += Number(item.total || 0);
        });

        (p.aacItems || []).forEach(item => {
            if (!aacSummary[item.type]) {
                aacSummary[item.type] = { qty: 0, amount: 0 };
            }
            aacSummary[item.type].qty += Number(item.qty || 0);
            aacSummary[item.type].amount += Number(item.total || 0);
        });

        (p.redBricksItems || []).forEach(item => {
            if (!redBricksSummary[item.type]) {
                redBricksSummary[item.type] = { qty: 0, amount: 0 };
            }
            redBricksSummary[item.type].qty += Number(item.qty || 0);
            redBricksSummary[item.type].amount += Number(item.total || 0);
        });
    });

    container.innerHTML = `
        <div class="report-summary">
            <h3>Cement Yearly Summary</h3>
            ${Object.entries(cementSummary).map(([type, d]) =>
                `<p>${type} - Qty: ${d.qty} - Amount: ₹${Number(d.amount).toFixed(2)}</p>`
            ).join('')}

            <h3>Sand Yearly Summary</h3>
            ${Object.entries(sandSummary).map(([type, d]) =>
                `<p>${type} - Qty: ${d.qty} - Amount: ₹${Number(d.amount).toFixed(2)}</p>`
            ).join('')}

            <h3>Jalli Yearly Summary</h3>
            ${Object.entries(jalliSummary).map(([type, d]) =>
                `<p>${type} - Qty: ${d.qty} - Amount: ₹${Number(d.amount).toFixed(2)}</p>`
            ).join('')}

            <h3>AAC Blocks Yearly Summary</h3>
            ${Object.entries(aacSummary).map(([type, d]) =>
                `<p>${type} - Qty: ${d.qty} - Amount: ₹${Number(d.amount).toFixed(2)}</p>`
            ).join('')}

            <h3>Red Bricks Yearly Summary</h3>
            ${Object.entries(redBricksSummary).map(([type, d]) =>
                `<p>${type} - Qty: ${d.qty} - Amount: ₹${Number(d.amount).toFixed(2)}</p>`
            ).join('')}
        </div>

        <table class="report-table">
            <thead>
                <tr>
                    <th>${getTranslation('customerName')}</th>
                    <th>Mobile Number</th>
                    <th>Delivery Place</th>
                    <th>Payment Method</th>
                    <th>${getTranslation('date')}</th>
                    <th>${getTranslation('totalAmount')}</th>
                    <th>${getTranslation('givenAmount')}</th>
                    <th>${getTranslation('remainingAmount')}</th>
                </tr>
            </thead>

            <tbody>
                ${data.map(p => `
                    <tr>
                        <td>${p.customerName || '-'}</td>
                        <td>${p.customerMobile || '-'}</td>
                        <td>${p.deliveryPlace || '-'}</td>
                        <td>${p.paymentMethod || 'Cash'}</td>
                        <td>${p.date || '-'}</td>
                        <td>₹${Number(p.totalAmount || 0).toFixed(2)}</td>
                        <td>₹${Number(p.givenAmount || 0).toFixed(2)}</td>
                        <td>₹${Number(p.remainingAmount || 0).toFixed(2)}</td>
                    </tr>
                `).join('')}

                <tr class="total-row">
                    <td><strong>${getTranslation('total')}</strong></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><strong>₹${totalAmount.toFixed(2)}</strong></td>
                    <td><strong>₹${totalGiven.toFixed(2)}</strong></td>
                    <td><strong>₹${totalRemaining.toFixed(2)}</strong></td>
                </tr>
            </tbody>
        </table>
    `;
}
window.downloadPDF = function(reportType) {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let data = [];
    let title = '';

    if (reportType === 'day') {
        const date = document.getElementById('dayReportDate').value;
        data = purchases.filter(p => p.date === date);
        title = `Daily Report - ${date}`;
    }
    else if (reportType === 'monthly') {
        const month = document.getElementById('monthlyReportMonth').value;
        data = purchases.filter(p => p.date.startsWith(month));
        title = `Monthly Report - ${month}`;
    }
    else if (reportType === 'yearly') {
        const year = document.getElementById('yearlyReportYear').value;
        data = purchases.filter(p => p.date.startsWith(year));
        title = `Yearly Report - ${year}`;
    }

    if (data.length === 0) {
        alert("No data found");
        return;
    }

    let logoData = null;
    const logo = document.getElementById('companyLogo');

    if (logo && logo.complete && logo.naturalWidth > 0) {
        const canvas = document.createElement('canvas');
        canvas.width = logo.naturalWidth;
        canvas.height = logo.naturalHeight;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(logo, 0, 0);
        logoData = canvas.toDataURL('image/png');
    }

    function drawHeader() {
        doc.setFillColor(0, 102, 204);
        doc.rect(0, 0, 210, 28, 'F');

        if (logoData) {
            doc.addImage(logoData, 'PNG', 5, 3, 20, 20);
        }

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(18);
        doc.text("Sri Krishna Blue Metals", 30, 13);

        doc.setFontSize(11);
        doc.text(title, 30, 21);

        doc.setTextColor(0, 0, 0);
    }

    drawHeader();

    let y = 40;

    data.forEach((p, index) => {

        if (y > 240) {
            doc.addPage();
            drawHeader();
            y = 40;
        }

        doc.setFillColor(245, 245, 245);
        doc.roundedRect(10, y, 190, 47, 3, 3, 'F');

        doc.setFontSize(11);

        doc.text(`S.No : ${index + 1}`, 15, y + 8);
        doc.text(`Customer : ${p.customerName || ''}`, 55, y + 8);

        doc.text(`Date : ${p.date || ''}`, 15, y + 16);
        doc.text(`Mobile : ${p.customerMobile || 'N/A'}`, 95, y + 16);
        doc.text(`Delivery Place : ${p.deliveryPlace || 'N/A'}`, 145, y + 16);

        doc.text(`Total : ₹${p.totalAmount || 0}`, 15, y + 24);
        doc.text(`Given : ₹${p.givenAmount || 0}`, 80, y + 24);
        doc.text(`Balance : ₹${p.remainingAmount || 0}`, 145, y + 24);

        doc.text(`Payment Method : ${p.paymentMethod || 'N/A'}`, 15, y + 32);

        y += 50;

        (p.cementItems || []).forEach(item => {
            if (y > 275) {
                doc.addPage();
                drawHeader();
                y = 40;
            }
            doc.text(`Cement - ${item.type} | Qty: ${item.qty} | Amount: ₹${item.total}`, 15, y);
            y += 6;
        });

        (p.sandItems || []).forEach(item => {
            if (y > 275) {
                doc.addPage();
                drawHeader();
                y = 40;
            }
            doc.text(`Sand - ${item.type} | Qty: ${item.qty} | Amount: ₹${item.total}`, 15, y);
            y += 6;
        });

        (p.jalliItems || []).forEach(item => {
            if (y > 275) {
                doc.addPage();
                drawHeader();
                y = 40;
            }
            doc.text(`Jalli - ${item.type} | Qty: ${item.qty} | Amount: ₹${item.total}`, 15, y);
            y += 6;
        });

        (p.aacItems || []).forEach(item => {
            if (y > 275) {
                doc.addPage();
                drawHeader();
                y = 40;
            }
            doc.text(`AAC Block - ${item.type} | Qty: ${item.qty} | Amount: ₹${item.total}`, 15, y);
            y += 6;
        });

        (p.redBricksItems || []).forEach(item => {
            if (y > 275) {
                doc.addPage();
                drawHeader();
                y = 40;
            }
            doc.text(`Red Bricks - ${item.type} | Qty: ${item.qty} | Amount: ₹${item.total}`, 15, y);
            y += 6;
        });

        y += 8;
    });

    const pageCount = doc.internal.getNumberOfPages();

    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(`Page ${i} of ${pageCount}`, 170, 290);
    }

    doc.save("SriKrishnaBlueMetals_Report.pdf");
}
window .alert =function(message) {

    const popup = document.createElement("div");

    popup.className = "custom-alert";

    popup.innerHTML = message;


    document.body.appendChild(popup);


     setTimeout(() => {

        popup.classList.add("close-alert");


        setTimeout(() => {

            popup.remove();

        },500);


    },2500);

}
window.showNotification = function(message, type) {
    const div = document.createElement('div');
    div.className = `notification-toast ${type}`;
    div.textContent = message;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

window.updateNotificationCounts =function() {
    const pendingPurchases = purchases.filter(p => p.remainingAmount > 0);
    const count = pendingPurchases.length;
    ['notificationCount', 'notificationCountReport', 'notificationCountSales'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = count;
    });
}
window.updateNotifications =function() {
    
    const pendingPurchases = purchases.filter(p => p.remainingAmount > 0);
    const notificationList = document.getElementById('notificationList');
    if (!notificationList) return;
    
    if (pendingPurchases.length === 0) {
        notificationList.innerHTML = `<p style="padding:20px;color:#666;">${getTranslation('noPending')}</p>`;
        return;
        //alert("notification vabthutya4");
    }

    const today = new Date();
    const notifications = [];

    pendingPurchases.forEach(p => {
        
        const purchaseDate = new Date(p.date);
        const daysDiff = Math.floor((today - purchaseDate) / (1000 * 60 * 60 * 24));
        if (daysDiff >= 5) {
            notifications.push({
                type: 'critical',
                message: `${getTranslation('critical')}${p.customerName}${getTranslation('critical2')}${p.remainingAmount}${getTranslation('critical3')}${daysDiff}${getTranslation('critical4')}`,
                customerName: p.customerName,
                remainingAmount: p.remainingAmount
            });
        } else if (daysDiff >= 3) {
            notifications.push({
                type: 'warning',
                message: `${getTranslation('warning')}${p.customerName}${getTranslation('warning2')}${p.remainingAmount}${getTranslation('warning3')}${daysDiff}${getTranslation('warning4')}`,
                customerName: p.customerName,
                remainingAmount: p.remainingAmount
            });
        }
    });

    if (notifications.length === 0) {
        notificationList.innerHTML = `<p style="padding:20px;color:#666;">${getTranslation('noCritical')}</p>`;
        return;
    }

    notificationList.innerHTML = notifications.map(n => `
        <div class="notification-item ${n.type}" onclick="goToCustomer('${n.customerName}')">
            <p>${n.message}</p>
            <strong>${getTranslation('pendingAmount')}: ₹${n.remainingAmount}</strong>
        </div>
    `).join('');
}

window.showNotifications =function() {
    const panel = document.getElementById('notificationPanel');
    if (panel) {
        updateNotifications();
        panel.classList.remove('hidden');
    }
}

window.closeNotifications =function() {
    const panel = document.getElementById('notificationPanel');
    if (panel) panel.classList.add('hidden');
}

function goToCustomer(customerName) {
    closeNotifications();
    const input = document.getElementById('checkCustomerName');
    if (input) input.value = customerName;
    checkPendingCustomer();
    showPage('salesPage');
}


window.showTomorrowWork =function() {
    displayTomorrowWorkList();
    document.getElementById('tomorrowModal').classList.remove('hidden');
}

window.displayTomorrowWorkList =function() {
    const container = document.getElementById('tomorrowWorkList');
    if (!container) return;

    if (tomorrowWork.length === 0) {
        container.innerHTML = `<p style="color:#666;text-align:center;">No work scheduled for tomorrow</p>`;
        return;
    }

    container.innerHTML = tomorrowWork.map(w => `
        <div class="purchase-item">
            <h3>${w.customerName}</h3>
            <p>${getTranslation('date')}: ${w.date}</p>
            <p>${getTranslation('workDesc')} ${w.work}</p>

            <button onclick="completeTomorrowWork(${w.id})"
                    class="edit-btn">
                ✅ Work Done
            </button>
        </div>
    `).join('');
}
window.completeTomorrowWork =function(id) {

    if (!confirm("Mark this work as completed?")) {
        return;
    }

    tomorrowWork = tomorrowWork.filter(w => w.id !== id);

    localStorage.setItem(
        'tomorrowWork',
        JSON.stringify(tomorrowWork)
    );

    displayTomorrowWorkList();

    showNotification(
        "Work completed and removed successfully",
        "success"
    );
}
window.addTomorrowWork=function() {

    const customerName =
        document.getElementById('tomorrowCustomer').value.trim();

    const date =
        document.getElementById('tomorrowDate').value;

    const work =
        document.getElementById('tomorrowWork').value.trim();

    if (!customerName || !date || !work) {
        showNotification(getTranslation('fillFields'), 'error');
        return;
    }

    tomorrowWork.push({
        id: Date.now(),
        customerName,
        date,
        work,
        completed: false
    });

    localStorage.setItem(
        'tomorrowWork',
        JSON.stringify(tomorrowWork)
    );

    document.getElementById('tomorrowCustomer').value = '';
    document.getElementById('tomorrowDate').value = '';
    document.getElementById('tomorrowWork').value = '';

    displayTomorrowWorkList();

    showNotification(
        'Tomorrow work added successfully',
        'success'
    );
}

 async function loadPurchases() {

    purchases = [];

    const querySnapshot =
        await getDocs(collection(db, "purchases"));

    querySnapshot.forEach((docSnap) => {

        purchases.push({
            firebaseId: docSnap.id,
            ...docSnap.data()
        });

    });

    displayTodayPurchases();
    updateNotifications();
}

window. getTranslation = function(key) {
    return currentLanguage === 'tamil' ? (tamilTranslations[key] || englishTranslations[key] || key) : (englishTranslations[key] || key);
}

window. setLanguage = function(lang) {
    currentLanguage = lang;
    document.getElementById('englishBtn').classList.toggle('active', lang === 'english');
    document.getElementById('tamilBtn').classList.toggle('active', lang === 'tamil');

    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        el.textContent = getTranslation(key);
    });

    document.querySelectorAll('[data-p]').forEach(el => {
        const key = el.getAttribute('data-p');
        el.placeholder = getTranslation(key);
    });

    updateDisplayRates();
    displayTodayPurchases();
}
async function testFirebase() {

    const docRef = await addDoc(
        collection(db, "test"),
        {
            name: "Suthanthra",
            time: Date.now()
        }
    );

    alert("Saved: " + docRef.id);
}

/*const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct")

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");

const returnBtn = document.getElementById("return-btn");

var email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;

createacctbtn.addEventListener("click", function() {
  var isVerified = true;

  signupEmail = signupEmailIn.value;
  confirmSignupEmail = confirmSignupEmailIn.value;
  if(signupEmail != confirmSignupEmail) {
      window.alert("Email fields do not match. Try again.")
      isVerified = false;
  }

  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if(signupPassword != confirmSignUpPassword) {
      window.alert("Password fields do not match. Try again.")
      isVerified = false;
  }
  
  if(signupEmail == null || confirmSignupEmail == null || signupPassword == null || confirmSignUpPassword == null) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }
  
  if(isVerified) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      window.alert("Success! Account created.");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      window.alert("Error occurred. Try again.");
    });
  }
});

submitButton.addEventListener("click", function() {
  email = emailInput.value;
  console.log(email);
  password = passwordInput.value;
  console.log(password);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        alert("Login Success");
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("statusPage").style.display = "block";
        
      // Signed in
      const user = userCredential.user;
      console.log("Success! Welcome back!");
      window.alert("Success! Welcome back!");
        
        //
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error occurred. Try again.");
      window.alert("Error occurred. Try again.");
    });
});

signupButton.addEventListener("click", function() {
    main.style.display = "none";
    createacct.style.display = "block";
});

returnBtn.addEventListener("click", function() {
    main.style.display = "block";
    createacct.style.display = "none";
});
   
*/

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
document.getElementById('tomorrowDate').value = tomorrow.toISOString().split('T')[0];

const today = new Date().toISOString().split('T')[0];
const todayRates = ratesHistory.find(r => r.date === today);

if (todayRates) {
    document.getElementById('cementRate').value = todayRates.cement || 400;
    document.getElementById('jalliRate').value = todayRates.jalli || 1200;
    document.getElementById('sandRate').value = todayRates.sand || 1000;
    document.getElementById('redBricksRate').value = todayRates.redBricks || 10;
    document.getElementById('aacRate').value = todayRates.aac || AAC_RATES['6inch'];
} else {
    document.getElementById('cementRate').value = 400;
    document.getElementById('jalliRate').value = 1200;
    document.getElementById('sandRate').value = 1000;
    document.getElementById('redBricksRate').value = 10;
    document.getElementById('aacRate').value = AAC_RATES['6inch'];
}

//function updateDisplayRates() {

window.updateSummary= function(cementBags, cementRate, cementTotal, jalli, jalliRate, jalliTotal, sand, sandRate, sandTotal, redBricks, redBricksRate, redBricksTotal, aacBlocks, aacRate, aacTotal, total) {
    document.getElementById('summaryCement').textContent = `${cementBags} bags × ₹${cementRate} = ₹${cementTotal}`;
    document.getElementById('summaryJalli').textContent = `${jalli} tons × ₹${jalliRate} = ₹${jalliTotal}`;
    document.getElementById('summarySand').textContent = `${sand} tons × ₹${sandRate} = ₹${sandTotal}`;
    document.getElementById('summaryRedBricks').textContent = `${redBricks} pcs × ₹${redBricksRate} = ₹${redBricksTotal}`;
    document.getElementById('summaryAac').textContent = `${aacBlocks} pcs × ₹${aacRate} = ₹${aacTotal}`;
    document.getElementById('summaryTotal').textContent = `₹${total}`;
}


document.getElementById('purchaseDate').value = new Date().toISOString().split('T')[0];
document.getElementById('dayReportDate').value = new Date().toISOString().split('T')[0];
document.getElementById('salesDayDate').value = new Date().toISOString().split('T')[0];
document.getElementById('monthlyReportMonth').value = new Date().toISOString().split('T')[0].substring(0, 7);
document.getElementById('salesMonthlyMonth').value = new Date().toISOString().split('T')[0].substring(0, 7);
document.getElementById('yearlyReportYear').value = new Date().getFullYear();
document.getElementById('salesYearlyYear').value = new Date().getFullYear();

window.updateDisplayRates = function(){
   
    const cementRate = parseFloat(document.getElementById('cementRate').value) || 400;
    //alert("rate epp?");
    const jalliRate = parseFloat(document.getElementById('jalliRate').value) || 1200;
    const sandRate = parseFloat(document.getElementById('sandRate').value) || 1000;
    const redBricksRate = parseFloat(document.getElementById('redBricksRate').value) || 10;

    //alert("rate epp 2??????");
    document.getElementById('displayCementRate').textContent = `₹${cement_RATES['dalmia']}/bag`;
    //alert("rate epp 3??????");
    document.getElementById('displayCementRate').textContent = `₹${cement_RATES['ultratech']}/bag`;
    document.getElementById('displayJalliRate').textContent = `₹${jalli_RATES['3/4 jalli']}/unit`;
    document.getElementById('displayJalliRate').textContent = `₹${jalli_RATES['1 1/2 Jalli']}/unit`;
    document.getElementById('displayJalliRate').textContent = `₹${jalli_RATES['Chips']}/unit`;
    document.getElementById('displayJalliRate').textContent = `₹${jalli_RATES['Gravel']}/unit`;
    document.getElementById('displaySandRate').textContent = `₹${sand_RATES['M sand']}/unit`;
    document.getElementById('displaySandRate').textContent = `₹${sand_RATES['P sand']}/unit`;
    document.getElementById('displaySandRate').textContent = `₹${sand_RATES['white M sand']}/unit`;
    document.getElementById('displaySandRate').textContent = `₹${sand_RATES['red white M sand']}/unit`;
    document.getElementById('displayRedBricksRate').textContent = `₹${redBricksRate}/pc`;
    document.getElementById('displayAac4Rate').textContent = `₹${AAC_RATES['4inch']}/pc`;
    document.getElementById('displayAac6Rate').textContent = `₹${AAC_RATES['6inch']}/pc`;
    document.getElementById('displayAac9Rate').textContent = `₹${AAC_RATES['9inch']}/pc`;
    
    //alert("rate epp ??????");
}


/*function logout() {
    showPage('loginPage');
    document.getElementById('passwordInput').value = '';
    document.getElementById('loginError').style.display = 'none';
    closeNotifications();
}*/

//displayTodayPurchases();
//updateNotificationCounts();
//updateDisplayRates();
//calculateAll();

  /*document.getElementById('aacType').addEventListener('change', function () {
    const type = this.value;
    document.getElementById('aacRate').value = AAC_RATES[type];
    calculateAll();
});
document.getElementById('cementType').addEventListener('change', function () {
    const type = this.value;
    document.getElementById('cementRate').value = cement_RATES[type];
    calculateAll();
});
document.getElementById('jalliType').addEventListener('change', function () {
    const type = this.value;
    document.getElementById('jalliRate').value = jalli_RATES[type];
    calculateAll();
});
document.getElementById('sandType').addEventListener('change', function () {
    const type = this.value;
    document.getElementById('sandRate').value = sand_RATES[type];
    calculateAll();
});
  
*/

