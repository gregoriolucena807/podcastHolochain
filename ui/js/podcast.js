
/* PROPIOS DE ESTA VENTANA ------------------------------------------------------------------------------------------------------------------- */

let duracionSegundos = 0;
let currentSegund = 0;
let progress = 0;
let currentSegun2 = 0;
let statusPlay = "pause";

$("#podcastPlay").click(function(event) {statusPlay = "play";});
$("#podcastPause").click(function(event) {statusPlay = "pause";});

function varGet(name) {name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),results = regex.exec(location.search);return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));}
var idHash = varGet("id")

podcastRead(idHash, function(data){
    /* Se separan las cadenas del backend */
    var idH = data.split("<$-||-$>");
    /* Se obtiene la cadena del hash */
    var cad = JSON.parse(idH[1]);
    if (cad.TITULO == ""){
        $("#titleIndpost").html("The Podcast does not exist");
    }else{
        $("#titleIndpost").html("<a href='../'><i class='fa fa-home'></i> HOME<a> | <a>PODCAST</a>");
        $("#podcastTitle").html(cad.TITULO);
        $("#podcastDate").html(cad.FECHA);
        $("#playPodcast").attr("src",cad.AUDIO);
        $("#podcastTheme").html(cad.THEME);
        $("#podcastDesc").html(cad.TITULO + " description.");
        $("#podcastContent").html(cad.DESC);
        $("#timePodcast").html(cad.TIME);

        duracionSegundos = cad.SEGUNDOS;
    }
});
$("#podcastPlay").html('<i class="fa fa-spinner fa-spin"></i>');
$("#podcastPlay").attr("disabled", "disabled");
$("#podcastDownload").attr("disabled", "disabled");

let iReadAudio = 0;
let src = "";
cargaHash ();

function cargaHash (){
    readLengthPodcastAudio(idHash, function(respuesta){
        let longitud = respuesta;
        if ((iReadAudio + 1) <= longitud){
            let cadenaJsonText = {
                "I" : iReadAudio,
                "HASH" : idHash
            }
            /* console.log("Descargando bloque: " + (iReadAudio + 1) + "/" + longitud) */
            let porcentaje = 0;
            if((iReadAudio + 1) == longitud){porcentaje = 100;$("#podcastDownload").removeAttr("disabled");}else{porcentaje = (iReadAudio * 100) / longitud;}
            let cadenaJson = JSON.stringify(cadenaJsonText);
            readPodcastAudio(cadenaJson, function(data){
                src += data;
                procesaDataAudio(src, porcentaje);
            });  
        }
    });
}
function procesaDataAudio(data, porcentaje){
    /* setTimeout (function(){ */
    $("#podcastPlay").html('<i class="fa fa-play"></i>');
    $("#podcastPlay").removeAttr("disabled");

    currentSegun2 = document.getElementById("playPodcast").currentTime;
    $("#playPodcast").attr("src", data);
    document.getElementById("playPodcast").currentTime = currentSegun2;
    if (statusPlay === "play"){document.getElementById("playPodcast").play();}
    iReadAudio++;
    $("#downloadInfoBar").html('<i class="fa fa-download"></i>' + Math.round(porcentaje) + '%');
    $("#progressAudioPodcastD").css("width",porcentaje + "%");
    cargaHash ();
    /* }, 3000); */
}

setInterval(function(){
    /* MOver la barra de progreso */
    currentSegund = document.getElementById("playPodcast").currentTime

    progress = (currentSegund * 100) / duracionSegundos;
    $("#progressAudioPodcast").css("width", progress + "%");
    /* Convertir el intervalo en minutos y segundos  */
    var time = currentSegund;var hours = Math.floor( time / 3600 );var minutes = Math.floor( (time % 3600) / 60 );var seconds = time % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    seconds = Math.round(seconds);
    if (seconds < 10){seconds = "0"+ seconds;}
    if (hours == 0){
        audioDuration = minutes + ":" + seconds;
        $("#timeCurrent").html(audioDuration);
    }else{
        audioDuration = hours + ":" + minutes + ":" + seconds;
        $("#timeCurrent").html(audioDuration);
    }

}, 1000);

/* barra de progreso dinamica para el audio */
$("#progressAudio").click(function(event) {
    var currentPosition = event.offsetX;
    var maxPosition = $("#progressAudio").width();
    var widthPosition = (currentPosition * 100) / maxPosition;
    $("#progressAudioPodcast").css("width", widthPosition + "%");
    var timeMod = ((widthPosition * duracionSegundos) / 100);
    
    document.getElementById("playPodcast").currentTime = timeMod;
});
/* Esta funcion permite saber el tiempo en un title en la barar de progreso al pasar el mouse sobre ella */
function verTime(obj){
    var currentPosition = event.offsetX;
    var maxPosition = $(obj).width();
    var widthPosition = (currentPosition * 100) / maxPosition;
    var timeMod = ((widthPosition * duracionSegundos) / 100);

    /* Convertir el intervalo en minutos y segundos  */
    var time = timeMod;var hours = Math.floor( time / 3600 );var minutes = Math.floor( (time % 3600) / 60 );var seconds = time % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    seconds = Math.round(seconds);
    if (seconds < 10){seconds = "0"+ seconds;}
    if (hours == 0){
        audioDuration = minutes + ":" + seconds;
        $(obj).attr("title","Listen from: [" + audioDuration + "]");
    }else{
        audioDuration = hours + ":" + minutes + ":" + seconds;
        $(obj).attr("title","Listen from: [" + audioDuration + "]");

    }
}
function crear_cat (id,nombre){
    $.get('../dat/categorias.html',{},function(data){
        $("#categoriasPodcast").append(data);
        /* Cambiar Id de los Objetos HTML */
        var idContentCat = id + "_ContentCat";
        var idCollapseCat = id + "_CollapseCat";
        var idTituloCat = id + "_TituloCat";

        $("#idCollapse").attr("id", idContentCat);
        $("#idContent").attr("id", idCollapseCat);
        $("#catTitulo").attr("id", idTituloCat);
        $("#"+idContentCat).attr("href","#" + idCollapseCat);
        $("#"+idTituloCat).html('<i class="fa fa-circle-o fa-sm"></i> ' + nombre);
    });
}

$("#podcastDownload").click(function(event) {
    let dataurl = $("#playPodcast").attr("src");
    let filename = $("#podcastTitle").html();
    
    console.log (dataurl)
    console.log (filename)
});