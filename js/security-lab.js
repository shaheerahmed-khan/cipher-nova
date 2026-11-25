const scenarios = [
  {
    id: 1,
    type: "Email Scenario",
    senderName: "PayPal Security",
    senderAddress: "security-alert@paypa1-support-verify.com",
    recipient: "user@personal-mail.com",
    subject: "URGENT: Your Account Will Be Suspended in 24 Hours!",
    content: [
      "Dear Valued Customer,",
      "We detected unauthorized login attempts on your account from an unrecognized device.",
      "Failure to confirm your identity within 24 hours will result in permanent account limitation and frozen funds.",
    ],
    linkPreview: "http://paypa1-support-verify.com/secure-login/auth",
    isPhishing: true,
    summary:
      "Correctly identifying this saves your credentials—this is a classic phishing attempt.",
    clues: [
      "Typosquatting domain ('paypa1' uses the number 1 instead of the letter 'l').",
      "Generic greeting ('Dear Valued Customer') instead of your real name.",
      "Artificial 24-hour urgency designed to make you panic and click.",
      "Unencrypted HTTP link leading to a non-PayPal domain.",
    ],
  },
  {
    id: 2,
    type: "Email Scenario",
    senderName: "Google Accounts",
    senderAddress: "no-reply@accounts.google.com",
    recipient: "alex.student@gmail.com",
    subject: "Security alert: New sign-in on Windows",
    content: [
      "Hi Alex,",
      "Your Google Account was just signed in to from a new Windows device. You are receiving this email to make sure it was you.",
      "If this was you, you don't need to do anything. If not, visit your Google Account Security settings directly to review recent activity.",
    ],
    linkPreview: "https://myaccount.google.com/notifications",
    isPhishing: false,
    summary: "This is a legitimate security notification from Google.",
    clues: [
      "Uses an authentic official subdomain (@accounts.google.com).",
      "Addresses you by your actual account name ('Hi Alex').",
      "Does not demand immediate password entry or threaten instant suspension.",
      "Points to a genuine HTTPS Google domain (myaccount.google.com).",
    ],
  },
  {
    id: 3,
    type: "SMS Scenario",
    senderName: "USPS-Delivery-Alert",
    senderAddress: "+1 (833) 492-0194",
    recipient: "+1 (555) 234-8890",
    subject: "SMS Message — Delivery Attempt Notice",
    content: [
      "USPS: Your package #US9514901185 could not be delivered due to an incomplete street address.",
      "Update your delivery preferences immediately to avoid return to sender:",
    ],
    linkPreview: "https://usps-track-redelivery-fee.info/confirm",
    isPhishing: true,
    summary: "This is a 'Smishing' (SMS phishing) text message.",
    clues: [
      "Sent from a random 10-digit phone number rather than an official short code.",
      "Uses a suspicious third-party '.info' domain instead of usps.com.",
      "Official postal services do not send unsolicited texts asking for redelivery fees.",
    ],
  },
  {
    id: 4,
    type: "Email Scenario",
    senderName: "HR & Payroll Portal",
    senderAddress: "hr-benefits@company-portal-update.net",
    recipient: "employee@organization.org",
    subject: "Action Required: 2026 Employee Bonus & Tax Form",
    content: [
      "Hello Team,",
      "Please review the attached Q4 performance bonus schedule and re-enter your network credentials on the HR portal before 5:00 PM today so payroll can process your direct deposit.",
    ],
    linkPreview: "https://company-portal-update.net/sso-login",
    isPhishing: true,
    summary: "This is a targeted spear-phishing lure.",
    clues: [
      "Uses an external lookalike domain (.net) instead of your company's real domain.",
      "Dangles a financial incentive (bonus) to lower your guard.",
      "Demands SSO credential re-entry under a strict same-day deadline.",
    ],
  },
  {
    id: 5,
    type: "Email Scenario",
    senderName: "GitHub",
    senderAddress: "notifications@github.com",
    recipient: "dev.user@organization.org",
    subject: "[GitHub] A personal access token was added to your account",
    content: [
      "Hey there,",
      "A new personal access token (classic) with repo scope was recently added to your account.",
      "If you initiated this change, no further action is required. If you do not recognize this activity, please revoke the token in your developer settings.",
    ],
    linkPreview: "https://github.com/settings/tokens",
    isPhishing: false,
    summary: "This is a legitimate automated activity alert from GitHub.",
    clues: [
      "Sent from the verified @github.com domain.",
      "Tells you no action is required if you recognize the change.",
      "Links directly to the official github.com settings path over HTTPS.",
    ],
  },
];

// page elements
const scenarioCounter = document.getElementById("scenarioCounter");
const scoreDisplay = document.getElementById("scoreDisplay");
const accuracyDisplay = document.getElementById("accuracyDisplay");

const messageChannel = document.getElementById("messageChannel");
const messageSender = document.getElementById("messageSender");
const messageRecipient = document.getElementById("messageRecipient");
const messageSubject = document.getElementById("messageSubject");
const messageBody = document.getElementById("messageBody");
const messageLinkPreview = document.getElementById("messageLinkPreview");

const form = document.getElementById("classificationForm");
const submitBtn = document.getElementById("submitVerdictBtn");
const nextBtn = document.getElementById("nextScenarioBtn");
const resetBtn = document.getElementById("resetLabBtn");

const feedbackPanel = document.getElementById("diagnosticFeedback");
const feedbackHeading = document.getElementById("feedbackHeading");
const feedbackSummary = document.getElementById("feedbackSummary");
const feedbackClues = document.getElementById("feedbackClues");

const finalResultsCard = document.getElementById("finalResultsCard");
const finalScoreText = document.getElementById("finalScoreText");

// State
let currentIndex = 0;
let result = {
  correct: 0,
  wrong: 0,
};

function renderScenario(index) {
  const item = scenarios[index];

  // Update scoreboard counter
  scenarioCounter.textContent = `${index + 1} of ${scenarios.length}`;

  // Fill in the message details
  messageChannel.textContent = item.type;
  messageSender.innerHTML = `${item.senderName} &lt;<code>${item.senderAddress}</code>&gt;`;
  messageRecipient.textContent = item.recipient;
  messageSubject.textContent = item.subject;
  messageLinkPreview.textContent = item.linkPreview;

  // Render body paragraphs cleanly
  messageBody.innerHTML = item.content.map((paragraphs) => `<p>${paragraphs}</p>`).join("");

  // Reset form and feedback state for the new scenario
  form.reset();
  setRadioDisabled(false);
  submitBtn.hidden = false;
  nextBtn.hidden = true;
  feedbackPanel.hidden = true;
  feedbackPanel.classList.remove("is-correct", "is-incorrect");
}

function updateScoreboard() {
  const answered = result.correct + result.wrong;
  const accuracy =
    answered === 0 ? 0 : Math.round((result.correct / answered) * 100);

  scoreDisplay.textContent = `${result.correct} / ${scenarios.length}`;
  accuracyDisplay.textContent = `${accuracy}%`;
}

function setRadioDisabled(disabled) {
  const radios = form.querySelectorAll('input[name="verdict"]');
  radios.forEach((radio) => {
    radio.disabled = disabled;
  });
}

function evaluateAnswer(selectedValue) {
  const currentScenario = scenarios[currentIndex];
  const userSaysPhishing = selectedValue === "phishing";
  const isCorrect = userSaysPhishing === currentScenario.isPhishing;

  if (isCorrect) {
    result.correct += 1;
    feedbackHeading.textContent = "✓ Correct Classification";
    feedbackPanel.classList.add("is-correct");
  } else {
    result.wrong += 1;
    feedbackHeading.textContent = "✕ Incorrect Classification";
    feedbackPanel.classList.add("is-incorrect");
  }

  feedbackSummary.textContent = currentScenario.summary;
  feedbackClues.innerHTML = currentScenario.clues
    .map((clue) => `<li>${clue}</li>`)
    .join("");

  feedbackPanel.hidden = false;
  updateScoreboard();
  setRadioDisabled(true);
  submitBtn.hidden = true;

  // Show Next button or Final Summary if on the last scenario
  if (currentIndex < scenarios.length - 1) {
    nextBtn.hidden = false;
  } else {
    showFinalSummary();
  }
}

function showFinalSummary() {
  const accuracy = Math.round((result.correct / scenarios.length) * 100);
  finalScoreText.textContent = `You scored ${result.correct} out of ${scenarios.length} (${accuracy}% accuracy).`;
  finalResultsCard.hidden = false;
}

// Event Listeners
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedRadio = form.querySelector('input[name="verdict"]:checked');
  if (!selectedRadio) return;

  evaluateAnswer(selectedRadio.value);
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < scenarios.length - 1) {
    currentIndex += 1;
    renderScenario(currentIndex);
  }
});

resetBtn.addEventListener("click", () => {
  currentIndex = 0;
  result.correct = 0;
  result.wrong = 0;
  finalResultsCard.hidden = true;
  updateScoreboard();
  renderScenario(currentIndex);
});

// Initialize on load
updateScoreboard();
renderScenario(currentIndex);
