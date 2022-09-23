var port, ports, textEncoder, writableStreamClosed, writer = -1;
const lineHistory = [];
async function connectSerial() {
    try {
        //para escolher qualquer porta disponivel:
        port = await navigator.serial.requestPort();
       // ports = await navigator.serial.getPorts();
        //port = ports[0];
        //////await port.open({ baudRate: document.getElementById("baud").value });
      //  port= "COM3";
    //    serial
        await port.open({ baudRate: 9600});

        //let settings = {};

        //if (localStorage.dtrOn == "true") settings.dataTerminalReady = true;
        //if (localStorage.rtsOn == "true") settings.requestToSend = true;
       // if (Object.keys(settings).length > 0) await port.setSignals(settings);

        textEncoder = new TextEncoderStream();
        writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
        writer = textEncoder.writable.getWriter();
        await listenToPort();
    } catch (e){
        //alert("Erro. É possível que a máquina já esteja conectada ou que ela não tenha sido selecionada");
    }
}
async function sendSerialLine() {
    dataToSend = document.getElementById("lineToSend").value;
    await writer.write(dataToSend);
   // document.getElementById("lineToSend").value = "";
}
    /* para RECEBER dados do serial:
    async function listenToPort() {
    const textDecoder = new TextDecoderStream();
    const reader = textDecoder.readable.getReader();
    while (true) {
        const { value, done } = await reader.read();
        if (done) {
             Allow the serial port to be closed later:
            console.log('[readLoop] DONE', done);
            reader.releaseLock();
            break;
        }
         value is a string:
        appendToTerminal(value);
   } }*/


document.getElementById("baud").value = (localStorage.baud == undefined ? 9600 : localStorage.baud);
