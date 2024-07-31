function classifyTraffic(userAgent) {
    if (/Mobile|Android|iP(hone|ad|od)|IEMobile|Opera Mini/i.test(userAgent)) {
        return 'Mobile';
    } else if (/bot|crawler|spider|mediapartners/i.test(userAgent)) {
        return 'Bot';
    } else {
        return 'Desktop';
    }
}

function getFormattedDateTime() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);

    const hours = ('0' + currentDate.getHours()).slice(-2);
    const minutes = ('0' + currentDate.getMinutes()).slice(-2);
    const seconds = ('0' + currentDate.getSeconds()).slice(-2);

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
}

function trackPageViews(apiKey, siteKey) {
    const url = 'https://larnalytics.online/';
    fetch(url + 'get-client-ip')
        .then(response => response.json())
        .then(data => {
            const trafficSource = classifyTraffic(navigator.userAgent);

            let dataToSend = {
                site_key: siteKey,
                page_url: window.location.href,
                viewed_at: getFormattedDateTime(),
                ip_address: data.ip,
                user_agent: navigator.userAgent,
                device: trafficSource
            };

            let formData = new FormData();
            for (let key in dataToSend) {
                formData.append(key, dataToSend[key]);
            }

            const xhr = new XMLHttpRequest();
            xhr.open("POST", url + "api/track-page-views", true);
            xhr.setRequestHeader("X-API-KEY", apiKey);
            xhr.setRequestHeader("X-CSRF-TOKEN", data.csrf_token);

            xhr.onload = () => {
                let response = JSON.parse(xhr.responseText);
                if (response && response.success == true) {
                    return "Page view tracked successfully.";
                } else {
                    return;
                }
            };

            xhr.send(formData);
        })
        .catch(error => {
            return;
        });
}

module.exports = {
    trackPageViews
};
