let account = null;

function showMessage(msg, error = false) {
  const m = document.getElementById("message");
  m.style.color = error ? "red" : "green";
  m.textContent = msg;
}

// CREATE ACCOUNT
function createAccount() {
  const accNo = accNoInput();
  const name = document.getElementById("name").value;
  const balance = Number(document.getElementById("balance").value);
  const kyc = document.getElementById("kyc").checked;

  if (!accNo || !name || balance < 0) {
    return showMessage("Invalid account details", true);
  }

  account = {
    accNo,
    name,
    balance,
    kyc
  };

  document.getElementById("createSection").classList.add("hidden");
  document.getElementById("bankSection").classList.remove("hidden");

  showMessage("Account created successfully");
  generateReport();
}

// DEPOSIT
function deposit() {
  const amt = Number(document.getElementById("depAmt").value);
  if (amt <= 0) return showMessage("Invalid amount", true);

  account.balance += amt;
  showMessage("Deposit successful");
  generateReport();
}

// WITHDRAW
function withdraw() {
  const amt = Number(document.getElementById("withAmt").value);
  if (amt <= 0) return showMessage("Invalid amount", true);
  if (account.balance < amt) return showMessage("Insufficient balance", true);

  account.balance -= amt;
  showMessage("Withdrawal successful");
  generateReport();
}

// TRANSFER
function transfer() {
  const receiver = document.getElementById("receiverAcc").value;
  const amt = Number(document.getElementById("transAmt").value);

  if (!receiver || amt <= 0) return showMessage("Invalid transfer details", true);
  if (!account.kyc) return showMessage("KYC not verified", true);
  if (account.balance < amt) return showMessage("Insufficient balance", true);

  account.balance -= amt;
  showMessage(`Transferred ₹${amt} to ${receiver}`);
  generateReport();
}

// REPORT
function generateReport() {
  document.getElementById("report").innerHTML = `
    <p><b>Account No:</b> ${account.accNo}</p>
    <p><b>Name:</b> ${account.name}</p>
    <p><b>Balance:</b> ₹${account.balance}</p>
    <p><b>KYC Status:</b> ${account.kyc ? "Verified" : "Not Verified"}</p>
  `;
}

// helper
function accNoInput() {
  return document.getElementById("accNo").value;
}