document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const email = form.email.value; // التأكد من أنك تقوم بجلب قيمة البريد الإلكتروني
        const message = form.message.value; // التأكد من أنك تقوم بجلب الرسالة

        // إرسال البريد الإلكتروني
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: form.name.value, // اسم العميل
            to_email: 'ahmedashour3020@gmail.com',
            message: message
        }, 'YOUR_USER_ID')
        .then((response) => {
            console.log('Email sent successfully:', response.status);
        }, (error) => {
            console.error('Error sending email:', error);
        });

        // إنشاء ملف نصي محلي
        const fileContent = `Name: ${form.name.value}\nEmail: ${email}\nMessage: ${message}`;
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${form.name.value}.txt`; // اسم الملف سيكون اسم العميل
        link.click();
        
        alert('Your message has been sent successfully and the file has been created!');
        form.reset();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const sendButton = document.getElementById('send-button');
    const spinner = sendButton.querySelector('.spinner-border');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // تشغيل السبينر وتغيير النص إلى "جاري الإرسال..."
        spinner.style.display = 'inline-block';
        sendButton.disabled = true;
        sendButton.textContent = "جاري الإرسال...";

        // إضافة السبينر مجددًا بعد تحديث النص
        sendButton.prepend(spinner);

        // استكمال الكود لإرسال البيانات عبر AJAX
        const formData = new FormData(form);

        fetch('https://example.com/contact', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('تم إرسال رسالتك بنجاح!');
                form.reset();
            } else {
                alert('حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة لاحقاً.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة لاحقاً.');
        })
        .finally(() => {
            // إيقاف السبينر وإعادة تفعيل الزر بعد الإرسال
            spinner.style.display = 'none';
            sendButton.disabled = false;
            sendButton.textContent = "إرسال";
        });
    });
});



