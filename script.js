const ringtone = document.getElementById('ringtone');

function setupContactClick(li, nama) {
  li.addEventListener('click', () => {
    document.querySelectorAll('.contact-item').forEach(item => {
      item.classList.remove('selected');
    });

    li.classList.add('selected');
    window.selectedContact = nama;
    document.getElementById('status').textContent = `${nama} dipilih.`;
  });
}

// Setup klik untuk kontak awal
document.querySelectorAll('.contact-item').forEach(item => {
  const nama = item.querySelector('.contact-name')?.textContent || 'Kontak';
  setupContactClick(item, nama);
});

// Modal logic
const modal = document.getElementById('modalOverlay');
const inputNama = document.getElementById('contactNameInput');
const inputTelepon = document.getElementById('contactPhoneInput');

document.getElementById('addContactBtn').addEventListener('click', () => {
  inputNama.value = '';
  inputTelepon.value = '';
  modal.style.display = 'flex';
  inputNama.focus();
});

document.getElementById('cancelModal').addEventListener('click', () => {
  modal.style.display = 'none';
});

document.getElementById('confirmModal').addEventListener('click', () => {
  const nama = inputNama.value.trim();
  const telepon = inputTelepon.value.trim();

  if (nama && telepon) {
    tambahKontak(nama, telepon);
    modal.style.display = 'none';
  } else {
    alert('Nama dan nomor tidak boleh kosong!');
  }
});

function tambahKontak(nama, telepon) {
  const li = document.createElement('li');
  li.className = 'contact-item';

  const avatar = document.createElement('img');
  avatar.src = 'pp.png';
  avatar.className = 'avatar';
  avatar.alt = 'Foto';

  const infoDiv = document.createElement('div');
  infoDiv.className = 'contact-info';

  const nameSpan = document.createElement('span');
  nameSpan.className = 'contact-name';
  nameSpan.textContent = nama;

  const phoneSpan = document.createElement('span');
  phoneSpan.className = 'contact-phone';
  phoneSpan.textContent = telepon;

  infoDiv.appendChild(nameSpan);
  infoDiv.appendChild(phoneSpan);
  li.appendChild(avatar);
  li.appendChild(infoDiv);
  document.getElementById('contactList').appendChild(li);

  setupContactClick(li, nama);
}

// Tombol Telepon
document.getElementById('callBtn').addEventListener('click', () => {
  if (window.selectedContact) {
    document.getElementById('status').textContent = `Memanggil ${window.selectedContact} lewat Panggilan Suara...`;
    document.getElementById('callBtn').classList.add('active');
    document.getElementById('vcBtn').classList.remove('active');
    ringtone.currentTime = 0;
    ringtone.play();
  } else {
    document.getElementById('status').textContent = 'Silakan pilih kontak terlebih dahulu';
  }
});

// Tombol Video Call
document.getElementById('vcBtn').addEventListener('click', () => {
  if (window.selectedContact) {
    document.getElementById('status').textContent = `Memanggil ${window.selectedContact} lewat Panggilan Video...`;
    document.getElementById('vcBtn').classList.add('active');
    document.getElementById('callBtn').classList.remove('active');
    ringtone.currentTime = 0;
    ringtone.play();
  } else {
    document.getElementById('status').textContent = 'Silakan pilih kontak terlebih dahulu';
  }
});
