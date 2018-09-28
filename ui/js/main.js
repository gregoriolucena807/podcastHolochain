$(document).ready(function(){

    wow = new WOW({
        mobile:       false,
      }
    )
    wow.init();

     $('#top-nav').onePageNav({
        currentClass: 'current',
        changeHash: true,
        scrollSpeed: 1200
    });

     
    //animated header class
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $(".navbar-default").addClass("animated");
        } else {
            $(".navbar-default").removeClass('animated');
        }
    });

    $('#countdown_dashboard').countDown({
        targetDate: {
            'day':      11,
            'month':    3,
            'year':     2017,
            'hour':     00,
            'min':      00,
            'sec':      01,
        },
        omitWeeks: true
    });

    $('.init-slider').owlCarousel({
        items:1,
        merge:true,
        loop:true,
        video:true,
        smartSpeed: 600
    });

    /*$('input, textarea').data('holder', $('input, textarea').attr('placeholder'));

    $('input, textarea').focusin(function () {
        $(this).attr('placeholder', '');
    });
    $('input, textarea').focusout(function () {
        $(this).attr('placeholder', $(this).data('holder'));
    });*/


    //contact form validation
    $("#contact-form").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            message: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Please enter Your Name",
                minlength: "Your name must consist of at least 2 characters"
            },
            message: {
                required: "Please Write Something",
                minlength: "Your message must consist of at least 2 characters"
            },
            email: "Please enter a valid email address"
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                type:"POST",
                data: $(form).serialize(),
                url:"mail.php",
                success: function() {
                    $('#contact-form :input').attr('disabled', 'disabled');
                    $('#contact-form').fadeTo( "slow", 0.15, function() {
                        $(this).find(':input').attr('disabled', 'disabled');
                        $(this).find('label').css('cursor','default');
                        $('#success').fadeIn();
                    });
                },
                error: function() {
                    $('#contact-form').fadeTo( "slow", 0.15, function() {
                        $('#error').fadeIn();
                    });
                }
            });
        }
    });

});
var normalize = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};
 
  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );
 
  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }      
      return ret.join( '' );
  }
 
})();

/* Scripts ---------------------------------------------------------
Desarrollado por Henry Lucena
fecha 03/09/2018
Podcast
--------------------------------------------------------------------*/
var audioSrc = "";
var userAct = "User";
var currentHtml = "";
var tituloAudio = "";
var audioDuration = "";
var audioDurationSeg = "";

/* -------Convertir a Base64 -------*/
function getBase64(file, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      callback (reader.result);
    };
    reader.onerror = function (error) {
      callback ('Error: ', error);
    };
 }
 /* ------------------------------- */

function clearModal (){
	$("#fileName").html("");
    $("#uploadFile").val("");
    $("#uploadImg").val("");
    $("#btnUploadImg").attr("src","img/upload_img.jpg");

    $("#descPodcast").val("");
    $("#themePodcast").val("");
    $("#tagsPodcast").val("");
    $("#fileNamePlay").html("No selected file");
    $("#newPodcast").html('<i class="fa fa-upload"></i> Upload');
    $("#newPodcast").removeAttr("disabled");
    $("#cancelPodcast").removeAttr("disabled");
    $("#btnUploadFile").removeAttr("disabled");
    $("#progressUploadPodcastD").css("width","0%");

    currentHtml = "";
    tituloAudio = "";
}
$("#uploadPost").click(function(event) {
	clearModal ()
	$("#modalPost").modal("show");
});
$("#cancelPodcast").click(function(event) {
	$("#modalPost").modal("hide");
});

$("#btnUploadFile").click(function(event) {document.getElementById("uploadFile").click();});
$("#btnUploadImg").click(function(event) {document.getElementById("uploadImg").click();});

$("#uploadFile").change(function(event) {
    $("#btnUploadFile").html('<i class="fa fa-spinner fa-spin"></i> Loading');
    $("#fileName").html("[<strong style='font-size: 12px; color: maroon'>...</strong>]");
    $("#fileNamePlay").html("Please wait");
	var extension = document.getElementById("uploadFile").value.split('.').pop();
	if ($("#uploadFile").val() == ""){
		alertify.error("No file detected");
		$("#uploadFile").val("");
	}else if (extension == "mp3" || extension == "ogg"){
		var fic = document.getElementById("uploadFile").value.split('\\');
		var nombre_archivo= fic[fic.length-1];
		getBase64(document.querySelector('#uploadFile').files[0], function (resp){
            audioSrc = resp;
            tituloAudio = nombre_archivo.split(".mp3");
            tituloAudio = tituloAudio[0];
            $("#fileNamePlay").html('<audio id="newAudioPodcast" controls><source src="' + resp + '" type="audio/mpeg" id="sourceMp3">Your browser does not support the audio element.</audio>');
            /* Obtener Tiempo del Audio */
            var audio = new Audio();
            audio.src = resp;
            audio.addEventListener('loadedmetadata', function() {       
                var time = audio.duration;var hours = Math.floor( time / 3600 );var minutes = Math.floor( (time % 3600) / 60 );var seconds = time % 60;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                seconds = seconds < 10 ? '0' + seconds : seconds;
                seconds = Math.round(seconds);
                if (seconds < 10){seconds = "0"+ seconds;}
                if (hours == 0){
                    audioDuration = minutes + ":" + seconds;
                }else{
                    audioDuration = hours + ":" + minutes + ":" + seconds;
                }
                audioDurationSeg = Math.round(time);
            });
            $("#uploadFile").val("");
            $("#fileName").html("[<strong style='font-size: 12px; color: maroon'>" + tituloAudio + "</strong>]");
            $("#btnUploadFile").html('<i class="fa fa-volume-up"></i> Select a File');
        });
	}else{
		alertify.error("No valid file was detected (.mp3 o .ogg)");
		$("#uploadFile").val("");
	}
});

$("#newPodcast").click(function(event) {
    /* Separar en bloques pequeños (134000 caracteres) el base64 */
    let bloquesAudio = 134000;
    let porcentaje = 0;
    let controln = 0;
    if (audioSrc != ""){
        $("#newPodcast").html('<i class="fa fa-spinner fa-spin"></i> Uploading');
        $("#cancelPodcast").attr("disabled", "disabled");
        $("#newPodcast").attr("disabled", "disabled");
        $("#btnUploadFile").attr("disabled", "disabled");

        var f = new Date();
        var fecha = f.valueOf();
        var date = f.getDate() + "/" + (f.getMonth()) + "/" + f.getFullYear();
        var dia = f.getDate();
        var meses = new Array("Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic");
        var mes = meses[f.getMonth()];

        var cadena = {
            "ID" : fecha,
            "USER" : userAct,
            "TITULO" : tituloAudio,
            "TIME" : audioDuration,
            "SEGUNDOS" : audioDurationSeg,
            "DESC" : $("#descPodcast").val(),
            "THEME" : $("#themePodcast").val(),
            "TAG" : $("#tagsPodcast").val(),
            "FECHA" : date,
            "DIA" : dia,
            "MES" : mes,
            "BLOQUES" : Math.round((audioSrc.length) / bloquesAudio)
        };
        podcastShare(JSON.stringify(cadena), function(respHash){
            /* Obtener el hash de la cadena enviada respHash*/
            var inicioString = 0;
            var finString = bloquesAudio;
            var n = 0;
            var cantidadCadenas = Math.round((audioSrc.length) / bloquesAudio);

            /* FUNCION PARA SUBIR LA CADENA POR BLOQUES */
            function subirBloque (){
                var parteCadena = audioSrc.substring(inicioString, finString)
                var cadenaAudio = {
                    "ID" : n,
                    "PARENTHASH" : respHash,
                    "CADENA" : parteCadena
                }

                var cadenaAudioCorta = {
                    "ID" : n,
                    "PARENTHASH" : "CADENA_CORTA__" + respHash
                }
                podcastAudioCorto(respHash + "<$--||--$>" + JSON.stringify(cadenaAudioCorta) + "<$--||--$>", function(){});

                podcastAudio(respHash + "<$--||--$>" + JSON.stringify(cadenaAudio) + "<$--||--$>", function(){
                    /* console.log("Cadena (" + n + "/" + cantidadCadenas + ") subida"); */
                    porcentaje = (n * 100) / cantidadCadenas;
                    if (porcentaje > 100){porcentaje = 100}

                    $("#UploadInfoBar").html('<i class="fa fa-download"></i>' + Math.round(porcentaje) + '%');
                    $("#progressUploadPodcastD").css("width",porcentaje + "%");

                    if(audioSrc.length >= inicioString){subirBloque ()}
                    
                    if (n == cantidadCadenas && controln ==0){
                        clearModal ();
                        $("#modalPost").modal("hide");
                        alertify.success("The podcast has been successfully created");
                        controln++;
                    }
                });
                inicioString = finString;
                finString += bloquesAudio;
                n++;
            }
            subirBloque ();
        });
    }  
});
/* Crear las categorías -------------------*/
idCat = 0
function crearCategorias (id, nombre){
    idCat++;
    var json = {"ID" : id,"NOMBRE" : nombre};
    createCathegoriesDefault(JSON.stringify(json));
}
/* Categorías */
crearCategorias (idCat, "Stories and Beliefs");
crearCategorias (idCat, "News and Society");
crearCategorias (idCat, "Sport");
crearCategorias (idCat, "Music");
crearCategorias (idCat, "Science and Culture");
crearCategorias (idCat, "Welfare and Family");
crearCategorias (idCat, "Leisure");
crearCategorias (idCat, "Company and Technology");
/* ------------------------------------- */

function crear_cat (id,nombre){
    $.get('dat/categorias.html',{},function(data){
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
/* Leer las categorías -------------------*/
readCathegories("", function(respHash){
    var catSep = respHash.split("<--$$-->");
     /* Mediante esta funcion ordenamos los id de los JSON que comienza en 0 */
    function ordernaJsonCat (nro){
        for (var i = 0; i < catSep.length; i++) {
            var cad = catSep[i];
            if(cad != ""){
                jsonCad = JSON.parse(cad);
                if(jsonCad.ID == nro){
                    crear_cat (jsonCad.ID,jsonCad.NOMBRE);
                    ordernaJsonCat (nro + 1);
                    break;
                }
            }
        }
    }
    ordernaJsonCat (0);
});

var idHash = "";
let cantGral = 0;
let cantCiclo = 0;

setInterval(function(){
    var rutaAbsoluta = self.location.href;
    var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/"); 
    var rutaRelativa = rutaAbsoluta.substring( posicionUltimaBarra + "/".length , rutaAbsoluta.length );
    if(rutaRelativa == "" || rutaRelativa == "#"){
        podcastReadHash("", function(resp){
            currentHtml = resp;
            var cadSep = resp.split("<--$$-->");
            
            
            cantGral = (cadSep.length) - 1;

            /* Evitar que se repita el ciclo si no hay cambios */
            if (cantGral != cantCiclo){

                if(resp != ""){
                    /* if(currentHtml != resp && resp !=""){ */
                        /* $("#podcastContent").html(""); */
                        for (var i in cadSep) {
                            if (cadSep[i] != ""){
                                podcastRead(cadSep[i], function(data){
                                    /* Se separan las cadenas del backend */
                                    var idH = data.split("<$-||-$>");
                                    /* Se obtiene el Hash del podcast */
                                    var idHash = idH[0];
                                    /* Se obrtiene la cadena del hash */
                                    var cad = JSON.parse(idH[1]);
                                    
                                    /* Se envian estos datos al procesador para obtener la tarjeta del podcast */
                                    $.get('dat/podcastInd.html',{},function(html){
                                        var idContent = cad.ID + "_Content";
                                        var idTitle = cad.ID + "_Title";
                                        var idTime = cad.ID + "_Time";
                                        var idButton = cad.ID + "_Button";
                                        var idDia = cad.ID + "_Dia";
                                        var idMes = cad.ID + "_Mes";
                                        var idmain = cad.ID ;
        
                                        /* ----------------------------------------------------------- */
                                        var bloquesSubidos = "";
                                        
                                        /* Funcion que me indica cuantos bloques tiene el podcast */
                                        function totalBloques(msj, callback){callback (cad.BLOQUES);}
                                        
                                        /* if(cantCiclo != cantGral){ */

                                        
                                        readPodcastAudioMain("CADENA_CORTA__" + idHash, function(data){
                                            /* console.log (data); */
                                            var bloquesBase64 = 0;
                                            var idH = data.split("<$--||--$>");
                                            
                                            
                                            for (var i = 0; i < idH.length; i++) {
                                                var cad = idH[i];
                                                if (cad.substr(0,1) == "{"){
                                                    bloquesBase64 ++;
                                                    bloquesSubidos = bloquesBase64;
                                                }
                                            }

                                            totalBloques("",function(respBloq){
                                                var bloquesTotales = respBloq;
                                                bloquesSubidos = bloquesBase64;
                                                /* Si los bloques subidos coinciden con los totales carga la tarjeta */
                                                if (bloquesSubidos >= bloquesTotales){
                                                    cargaTarjetaPodcast ();
                                                }
                                            })
                                        });

                                        /* } */
                                        /* ----------------------------------------------------------- */
                                        function cargaTarjetaPodcast (){
                                            /* Buscar si el div con el ID ya existe para no agregarlo */
                                            if ($("#podcastContent").html() == ""){
                                                $("#podcastContent").append(html);
                                            }else{
                                                cadenaHtml = $("#podcastContent").html();
                                                if (cadenaHtml.indexOf(cad.ID) == -1){
                                                    $("#podcastContent").append(html);
                                                }
                                            }
                                            /* Cambiar Id de los Objetos HTML */
                                            $("#mainPodcast").attr("id", idmain);
                                            $("#titlePodcast").attr("id", idTitle);
                                            $("#contentPodcast").attr("id", idContent);
                                            $("#timePodcast").attr("id", idTime);
                                            $("#buttonPodcast").attr("id", idButton);
                                            $("#diaPodcast").attr("id", idDia);
                                            $("#mesPodcast").attr("id", idMes);
                                            /* ------------------------------ */
            
                                            $("#" + idTitle).html("<strong>" + cad.TITULO + "</strong>");
                                            $("#" + idContent).html(cad.DESC);
                                            $("#" + idTime).html('<i class="fa fa-clock-o"></i> ' + cad.TIME);
                                            $("#" + idDia).html(cad.DIA);
                                            $("#" + idMes).html(cad.MES);
                                            $("#" + idButton).attr("onclick", "openPodcast('" + idHash + "')");


                                            cantCiclo = cantGral;
                                        }
                                    });
                                });
                            }
                        }
                    /* } */
                }
            }
            
        });
    }
    
}, 2000);

function openPodcast(id){window.open ("podcast/?id=" + id,"_self");}