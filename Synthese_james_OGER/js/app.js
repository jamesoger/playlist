import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'


 //------------ref------------------------//
 
 export const page_active = ref("accueil")
 export const chansons = ref([])
 export const texte_recherche = ref("")
 export const image_chanson = ref("")
 export const temps_chanson = ref(0)
 export const source_audio = ref("")
 export const balise_audio = ref(null)
 export const play_pause = ref("&#9658")
 export const temps_reel = ref(0)
 export const progression = ref(0)
 export const volume = ref(1)
 export const volume_reel = ref(0.1)
 export  const tags_chanson = ref([])
 export const chanson_selection = ref(null)
 
 
 //---------------fonctions-----------------//


 //fonction pour changer de page
 export function changerPage(nom_page){
    page_active.value = nom_page
    
}



//evenements quand on clique sur une chanson
//on récupere l'image, l'audio, la durée, les tags, on`
//recupere l'id de la chanson selectionnée pour
//lui attribuer un background color
export function AfficherDetails(source){
    image_chanson.value = source.image
    source_audio.value = source.audio
    temps_chanson.value = source.temps 
    tags_chanson.value = source.tags
    chanson_selection.value = source
    //retour a play quand on change de chanson
    if(play_pause.value = "&#10074;&#10074"){
         play_pause.value = "&#9658"
    }
    //retour au debut dans la progression quand on change de chanson
    if(progression.value > 1){
       progression.value = 0
    }    
}

//fonction que j'utilise pour convertir les secondes en minutes 

export function ConvertirSecondesenMinutes(source){
    const secondes = Math.floor(source % 60)
    const minutes = Math.floor(source / 60)
    if (secondes === 60) {
        minutes++
        secondes = 0     
     }
     source= minutes + ':' + (secondes < 10 ? '0' : '') + secondes
     return source
} 

//fonction pour la progression selon la durée de la chanson
export function timeupdate(){
     progression.value = (balise_audio.value.currentTime/ balise_audio.value.duration) *100  
     const secondes = Math.floor(balise_audio.value.currentTime % 60)
     const minutes = Math.floor(balise_audio.value.currentTime / 60)
     if (secondes === 60) {
         minutes++
         secondes = 0    
     }
     temps_reel.value =  minutes + ':' + (secondes < 10 ? '0' : '') + secondes
 //si on est la fin de la chanson , le bouton revient a play si on veut
 //rejouer la chanson
     if(balise_audio.value.currentTime == balise_audio.value.duration){
        play_pause.value = "&#9658"}
}  

//fonction pour appliquer le play et pause selon l'etat
export function lancerAudio(){
    if (balise_audio.value.paused == false) {
        balise_audio.value.pause()
        play_pause.value = "&#9658"
    }else{
        balise_audio.value.play()
        play_pause.value = "&#10074;&#10074"
    }    
}


//fonction pour regler le volume de la chanson
export function setVolume(){
    volume_reel.value = volume.value /100
}

//filtre recherche par chanson ou artiste

export function filtrer(chansons) {
    const chansons_filtres = chansons.filter(chanson => {
    const titre = chanson.titre.toLowerCase()
    const artiste = chanson.artiste.toLowerCase()
    const recherche = texte_recherche.value.toLowerCase()
    return titre.includes(recherche) || artiste.includes(recherche)
    })
    return chansons_filtres
}

//fetch

fetch("data/chansons.json").then(resp => resp.json()).then(fichier => {
    chansons.value = fichier
   
})










