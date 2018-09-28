function genesis(){
  return true
}
function validateCommit () {
  return true
}
function validatePut (){
  return true
}
function validateLink(){
  return true
}
function validateMod(){
  return true
}

function podcastShare(texto){
  var textCommit = commit ('podcastText',texto)
  commit("podcastLinks",{    
      Links: [
        {Base: App.DNA.Hash,Link: textCommit, Tag: "podcast"}
      ]
  });
  return textCommit;
}

function podcastReadHash(){
  var linksAcum = "";
  var links = getLinks(App.DNA.Hash, "podcast", { Load: true });
  for (var i = 0; i < links.length; i++) {
    var linkArray = links[i]["Hash"]
    linksAcum += linkArray + "<--$$-->"
  }
  return linksAcum
}

function podcastRead(hash){
  var post = get (hash)
  return hash + "<$-||-$>" + post
}

function podcastAudio(texto){
  var textCommit = commit ('podcastText',texto)
  var textCommit2 = commit ('podcastText',texto)
  /* Creamos un id unico (HASH PADRE) para los tags para no consultar todos los podcast */
  var txt = get(textCommit)
  var idH = txt.split("<$--||--$>");
  var idHashParent = idH[0];

  commit("podcastLinks",{Links: [{Base: App.DNA.Hash,Link: textCommit2, Tag: idHashParent}]});
}

function podcastAudioCorto(texto){
  var textCommit = commit ('podcastText',texto)
  var textCommit2 = commit ('podcastText',texto)
  /* Creamos un id unico (HASH PADRE) para los tags para no consultar todos los podcast */
  var txt = get(textCommit)
  var idH = txt.split("<$--||--$>");
  var idHashParent = "CADENA_CORTA__" + idH[0];

  commit("podcastLinks",{Links: [{Base: App.DNA.Hash,Link: textCommit2, Tag: idHashParent}]});
}

function readLengthPodcastAudio(hash){
  var links = getLinks(App.DNA.Hash, hash, { Load: true });
  return links.length
}

function readPodcastAudioMain(hash){
  var linksAcum = "";
  var links = getLinks(App.DNA.Hash, hash, { Load: true });
  for (var i = 0; i < links.length; i++) {
    linksAcum += links[i]["Entry"]
  }
  return linksAcum
}

function readPodcastAudio(text){
  jsonCad = JSON.parse(text);
  hash = jsonCad.HASH;
  n = jsonCad.I;

  var links = getLinks(App.DNA.Hash, hash, { Load: true });
  /* Ordenar los links por el ID */
  for (var i = 0; i < links.length; i++) {
    var data = links[i]["Entry"];
    var idH = data.split("<$--||--$>");
    jsonidH = JSON.parse(idH[1]);
    if (jsonidH.ID == n){
      return jsonidH.CADENA
    }
  }

}

function createCathegoriesDefault(texto){
  var textCat = commit ('podcastText',texto)
  commit("podcastLinks",{    
      Links: [
        {Base: App.DNA.Hash,Link: textCat, Tag: "categorias"}
      ]
  });
  return textCat
}

function readCathegories(){
  var linksAcum = "";
  var links = getLinks(App.DNA.Hash, "categorias", { Load: true });
  for (var i = 0; i < links.length; i++) {
    linksAcum += links[i]["Entry"] + "<--$$-->"
  }
  return linksAcum
}