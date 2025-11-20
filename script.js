const form = document.getElementById('myForm');
const status = document.getElementById('status');
const submitBtn = document.getElementById('submitBtn');

// ← اپنا Web App URL یہاں ڈالیں
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxrQleZUBJyWWQt_Z1P-rttlmwvpONncMjmoVKJvKUNlSvbd0r5wQF4gpD6kCoGYEezQg/exec";

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  status.textContent = "جاری ہے۔۔۔";

  try {
    const formData = new FormData(form);

    const res = await fetch(WEB_APP_URL, {
      method: 'POST',
      body: formData
    });

    const result = await res.json();

    if (result.status === 'success') {
      status.textContent = "ڈیٹا محفوظ ہو گیا ✅";
      form.reset();
    } else {
      status.textContent = "کچھ مسئلہ ہوا: " + (result.message || "نامعلوم error");
    }
  } catch (err) {
    console.error(err);
    status.textContent = "سرور یا نیٹ ورک کی خرابی!";
  } finally {
    submitBtn.disabled = false;
  }
});
