document.getElementById('scanButton').addEventListener('click', function() {
    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
    scanner.addListener('scan', function(content) {
        // Apri l'URL con il codice a barre scannerizzato
        let url = "https://www.betaland.it/xsportapp/xsport_desktop/checkbet?ticket=" + content + "&system_code=BETALAND&language=it";
        window.open(url, '_blank');
    });
    Instascan.Camera.getCameras().then(function(cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            console.error('No cameras found.');
            alert('No cameras found.');
        }
    }).catch(function(e) {
        console.error(e);
        alert(e);
    });
});
