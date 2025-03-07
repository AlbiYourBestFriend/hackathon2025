const socket = io();

let barreStress = document.getElementById('barreStress')
let stress = 0;
let maxInterval1;
let maxInterval2;

//  ________________________________________________________________________________________



// function teste(){
//   setInterval(() => {
//     stress=0;
//   }, 15000);
// }




function testBarre() {
    if (stress <= 10) {
        barreStress.style.backgroundImage = 'url("barre/barre1.PNG")';
    } else if (stress <= 20) {
        barreStress.style.backgroundImage = 'url("barre/barre2.PNG")';
    } else if (stress <= 30) {
        barreStress.style.backgroundImage = 'url("barre/barre3.PNG")';
    } else if (stress <= 40) {
        barreStress.style.backgroundImage = 'url("barre/barre4.PNG")';
    } else if (stress <= 50) {
        barreStress.style.backgroundImage = 'url("barre/barre5.PNG")';
    } else if (stress <= 60) {
        barreStress.style.backgroundImage = 'url("barre/barre6.PNG")';
    } else if (stress <= 70) {
        barreStress.style.backgroundImage = 'url("barre/barre7.PNG")';
    } else if (stress <= 80) {
        barreStress.style.backgroundImage = 'url("barre/barre8.PNG")';
    } else if (stress <= 90) {
        barreStress.style.backgroundImage = 'url("barre/barre9.PNG")';
    } else if (stress >= 100) {
        barreStress.style.backgroundImage = 'url("barre/barreMax1.PNG")';
    }
}

//  ________________________________________________________________________________________


function addNoise() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = data[i + 1] = data[i + 2] = value;
        data[i + 3] = 255; // alpha
    }

    ctx.putImageData(imageData, 0, 0);
    document.body.style.backgroundImage = `url(${canvas.toDataURL()})`;
}


//  ________________________________________________________________________________________


function lireTexte() {
    // Récupérer le texte à lire depuis l'élément HTML avec l'ID 'texte'
    const Texte = document.getElementById('texte');
    const texteToSpeak = Texte ? Texte.innerText : "Texte par défaut";

    // Appeler l'API backend pour lire le texte
    fetch(`/speak?text=${encodeURIComponent(texteToSpeak)}`)
        .then(reponse => {
            if (!reponse.ok) {
                throw new Error('Erreur réseau lors de l\'appel de l\'API');
            }
            return reponse.text();
        })
        .then(data => {
            console.log(data); // Affiche la réponse du serveur
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
}


//  ________________________________________________________________________________________

let envoyerQuestion = document.getElementById("envoyerQuestion");
let parle1 = document.getElementById('son1');
let parle2 = document.getElementById('son2');
let insulte1 = document.getElementById('insulte1');
let insulte2 = document.getElementById('insulte2');
let insulte3 = document.getElementById('insulte3');
let insulte4 = document.getElementById('insulte4');
let insulte5 = document.getElementById('insulte5');
let insulte6 = document.getElementById('insulte6');
let insulte7 = document.getElementById('insulte7');

function doubleRandomWord(question) {
    if (!question) return '';
    let words = question.split(' ');
    if (words.length === 0) return question;

    let randomIndex = Math.floor(Math.random() * words.length);
    words.splice(randomIndex, 0, words[randomIndex]);

    return words.join(' ');
}


function addInsulte(question) {
    let listeInsulte = [
        'PUTE',
        'BITE',
        'CON',
        'CONNARD',
        'SALOPE',
        'MERDE',
        'PUTAIN'
    ];
    if (!question) return '';
    let Insulte = listeInsulte[Math.floor(Math.random() * listeInsulte.length)];
    let words = question.split(' ');
    let randomIndex = Math.floor(Math.random() * (words.length + 1));
    words.splice(randomIndex, 0, Insulte);

    return words.join(' ');
}


function addSGT(question) {
    let sgt = (Math.random() * 10) + 1;
    if (stress <= 20 && sgt >= 9) {
        question = doubleRandomWord(question);
    } else if (stress <= 30 && sgt >= 8) {
        question = doubleRandomWord(question);
        question = addInsulte(question);
    } else if (stress <= 40 && sgt >= 6) {
        question = doubleRandomWord(question);
        question = addInsulte(question);
    } else if (stress <= 50 && sgt >= 5) {
        question = doubleRandomWord(question);
        question = addInsulte(question);
    } else if (stress <= 60 && sgt >= 3) {
        question = doubleRandomWord(question);
        question = addInsulte(question);
    } else if (stress <= 70 && sgt >= 2) {
        question = doubleRandomWord(question);
        question = doubleRandomWord(question);
        question = addInsulte(question);
        question = addInsulte(question);
    } else if (stress <= 80 && sgt >= 1) {
        question = doubleRandomWord(question);
        question = doubleRandomWord(question);
        question = addInsulte(question);
        question = addInsulte(question);
    } else if (stress <= 90) {
        question = doubleRandomWord(question);
        question = doubleRandomWord(question);
        question = addInsulte(question);
        question = addInsulte(question);
    } else if (stress >= 100) {
        question = doubleRandomWord(question);
        question = doubleRandomWord(question);
        question = addInsulte(question);
        question = addInsulte(question);
        question = addInsulte(question);
        question = doubleRandomWord(question);
        question = doubleRandomWord(question);
        question = addInsulte(question);
        question = addInsulte(question);
        question = addInsulte(question);
    }
    return question;
}

// function speak(question) {
//   let utterance = new SpeechSynthesisUtterance(question);
//   // utterance.rate = speedInput.value || 1;
//   speechSynthesis.speak(utterance);
// }

// function speak(question) {
//   if ('speechSynthesis' in window) {
//     const utterance = new SpeechSynthesisUtterance(question);
//     console.log('parle');
//     // Optionnel : Configurer la voix, la vitesse, le volume, etc.
//     utterance.rate = 1; // Vitesse de la parole (0.1 à 10)
//     utterance.pitch = 1; // Hauteur de la voix (0 à 2)
//     utterance.volume = 1; // Volume (0 à 1)


//     // Lancer la synthèse vocale
//     window.speechSynthesis.speak(utterance);
//   } else {
//     console.error('La synthèse vocale n\'est pas supportée par ce navigateur.');
//   }
// }
let charg = document.getElementById('chargement');

function submitQuestion() {
    // Retrieve the question input element
    let questionInput = document.getElementById('questionInput');
    charg.style.display = 'block';

    // Check if the element exists and has a value
    if (questionInput) {
        let question = questionInput.value;

        // Check if the question is not empty or undefined
        if (question && question.trim() !== '') {
            // Send the question to the server via socket.io or an HTTP request
            socket.emit('question', question);

            // Define the response container outside the socket listener
            const reponseContainer = document.getElementById('reponseContainer');
            const questionElement = document.createElement('div');
            questionElement.textContent = ''; // Initially empty
            reponseContainer.appendChild(questionElement);

            questionInput.value = ''; // Clear input after sending
        }
    }
}

socket.on('response', (responseData) => {
    // Handle the server's response
    charg.style.display = 'none';
    const responseElement = document.createElement('div');
    reponseContainer.appendChild(responseElement);

    // Display the response word by word after receiving the response
    let wordIndex = 0;
    responseData = addSGT(responseData);
    const words = responseData.split(' '); // Use responseData instead of question
    const insultWords = ['PUTE', 'BITE', 'CON', 'CONNARD', 'SALOPE', 'MERDE', 'PUTAIN'];
    let pute = [
        'PUTE'
    ];
    let bite = [
        'BITE'
    ];
    let con = [
        'CON'
    ];
    let connard = [
        'CONNARD'
    ];
    let salope = [
        'SALOPE'
    ];
    let merde = [
        'MERDE'
    ];
    let putain = [
        'PUTAIN'
    ];

    function displayWordByWord() {
        if (wordIndex < words.length) {
            let sonTiming = (Math.random() * 400) + 400;
            let sonTiming2 = (Math.random() * 400) + 400;

            tete.style.backgroundImage = 'url("cybergirl_anim/png/^^1.png")';
            responseElement.textContent += words[wordIndex] + ' ';
            wordIndex++;

            if (insultWords.includes(words[wordIndex - 1])) {
                animInsulte();
                sonTiming = 750;
                if (salope.includes(words[wordIndex - 1])) {
                    insulte1.play();
                } else if (merde.includes(words[wordIndex - 1])) {
                    insulte2.play();
                } else if (connard.includes(words[wordIndex - 1])) {
                    insulte3.play();
                } else if (putain.includes(words[wordIndex - 1])) {
                    insulte4.play();
                } else if (bite.includes(words[wordIndex - 1])) {
                    insulte5.play();
                } else if (pute.includes(words[wordIndex - 1])) {
                    insulte6.play();
                } else if (con.includes(words[wordIndex - 1])) {
                    insulte7.play();
                }
            } else {
                parle1.play();
            }

            setTimeout(() => {
                if (wordIndex < words.length) {
                    tete.style.backgroundImage = 'url("cybergirl_anim/png/^^3.png")';
                    responseElement.textContent += words[wordIndex] + ' ';
                    wordIndex++;
                    if (insultWords.includes(words[wordIndex - 1])) {
                        animInsulte();
                        sonTiming2 = 750;
                        if (salope.includes(words[wordIndex - 1])) {
                            insulte1.play();
                        } else if (merde.includes(words[wordIndex - 1])) {
                            insulte2.play();
                        } else if (connard.includes(words[wordIndex - 1])) {
                            insulte3.play();
                        } else if (putain.includes(words[wordIndex - 1])) {
                            insulte4.play();
                        } else if (bite.includes(words[wordIndex - 1])) {
                            insulte5.play();
                        } else if (pute.includes(words[wordIndex - 1])) {
                            insulte6.play();
                        } else if (con.includes(words[wordIndex - 1])) {
                            insulte7.play();
                        }
                    } else {
                        parle1.play();
                    }
                }
            }, sonTiming2);

            setTimeout(displayWordByWord, sonTiming);
        } else {
            setTimeout(function() {
                clearInterval(intervalEcoute);
                clearInterval(intervalEcoute1);
                clearInterval(intervalEcoute2);
                clearInterval(intervalParle);
                clearInterval(intervalParle1);
                clearInterval(intervalParle2);
                animAttente();
            }, 1000);
        }
    }

    displayWordByWord();
});



//  ________________________________________________________________________________________


// // Créez une scène, une caméra et un rendu
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Ajoutez des lumières
// const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
// scene.add(light);

// // Chargez le modèle .obj
// const objLoader = new THREE.OBJLoader();
// objLoader.load(
//   'cybergirl.obj', // Remplacez par le chemin de votre fichier .obj
//   (object) => {
//     scene.add(object);
//     object.position.set(0, 0, 0); // Ajustez la position si nécessaire
//   },
//   (xhr) => {
//     console.log((xhr.loaded / xhr.total * 100) + '% loaded');
//   },
//   (error) => {
//     console.error('Une erreur est survenue lors du chargement du modèle:', error);
//   }
// );


// const mtlLoader = new THREE.MTLLoader();
// mtlLoader.load('cybergirl.mtl', (materials) => {
//   materials.preload();

//   const objLoader = new THREE.OBJLoader();
//   objLoader.setMaterials(materials);
//   objLoader.load('cybergirl.obj',(object) => {
//       scene.add(object);
//       object.position.set(0, 0, 0); // Ajustez la position si nécessaire
//     },
//     (xhr) => {
//       console.log((xhr.loaded / xhr.total * 100) + '% loaded');
//     },
//     (error) => {
//       console.error('Une erreur est survenue lors du chargement du modèle:', error);
//     }
//   );
// });


// // Positionnez la caméra
// camera.position.z = 5;


// // Fonction de rendu
// function animate() {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }
// animate();



//  ________________________________________________________________________________________


let intervalEcoute;
let intervalEcoute1;
let intervalEcoute2;
let intervalParle;
let intervalParle1;
let intervalParle2;
let lancer = -1;

let tete = document.getElementById('tete');
let tetegif = document.getElementById('teteGif');





function animAttente() {
    console.log('fin');
    tetegif.style.backgroundImage = 'url("cybergirl_3.gif");';
    tete.style.display = 'none';
    tetegif.style.display = 'block';
}

function animCligne() {
    tetegif.style.backgroundImage = 'url("cybergirl_3.gif");'
    setInterval(() => {
        tete.style.backgroundImage = 'url("cybergirl_anim/png/((2.png")';
        // animInsulte();
    }, 4000);
}

function Ecoute() {
    if (lancer <= 1) {
        tete.style.backgroundImage = 'url("cybergirl_anim/png/^^1.png")';
        setTimeout(function() {
            tete.style.backgroundImage = 'url("cybergirl_anim/png/^^2.png")';
        }, 500);
    }
}



function animEcoute() {
    tete.style.display = 'block';
    tetegif.style.display = 'none';
    clearInterval(intervalEcoute1);
    clearInterval(intervalEcoute2);

    intervalEcoute = setInterval(() => {
        lancer = 1;
        intervalEcoute1 = setInterval(() => {
            clearInterval(intervalEcoute1);
            tete.style.backgroundImage = 'url("cybergirl_anim/png/^^1.png")';

            intervalEcoute2 = setInterval(() => {
                clearInterval(intervalEcoute2);
                tete.style.backgroundImage = 'url("cybergirl_anim/png/^^2.png")';
            }, 500);
        }, 500);
    }, 1000);
}





function animInsulte() {
    clearInterval(intervalEcoute);
    clearInterval(intervalEcoute1);
    clearInterval(intervalEcoute2);
    clearInterval(intervalParle);
    clearInterval(intervalParle1);
    clearInterval(intervalParle2);
    let skinAleatoire = Math.floor(Math.random() * 13) + 1;
    console.log('skinAleatoire', skinAleatoire);
    if (skinAleatoire <= 1) {
        tete.style.backgroundImage = 'url("cybergirl_anim/png/pute1.png")';
    } else if (skinAleatoire <= 2) {
        tete.style.backgroundImage = 'url("cybergirl_anim/png/bombe1.png")';
    } else if (skinAleatoire <= 3) {
        tete.style.backgroundImage = 'url("cybergirl_anim/png/pute2.png")';
    } else if (skinAleatoire <= 4) {
        tete.style.backgroundImage = 'url("cybergirl_anim/png/xx1.png")';
    } else if (skinAleatoire <= 5) {
        tete.style.backgroundImage = 'url("cybergirl_anim/png/xx2.png")';
    } else if (skinAleatoire <= 6) {
        tete.style.backgroundImage = 'url("cybergirl_anim/png/xx3.png")';
    } else if (skinAleatoire <= 7) {
        tete.style.backgroundImage = 'url("cybergirl_anim/png/xx4.png")';
    } else if (skinAleatoire <= 8) {
        tete.style.backgroundImage = 'url("cybergirl_anim/png/xx5.png")';
    } else if (skinAleatoire <= 9) {
        tete.style.backgroundImage = 'url("cybergirl_anim/png/bombe2.png")';
    } else if (skinAleatoire <= 10) {
        tete.style.backgroundImage = 'url("cybergirl_anim/png/bombe3.png")';
    } else if (skinAleatoire <= 11) {
        tete.style.backgroundImage = 'url("cybergirl_anim/png/grr1.png")';
    } else if (skinAleatoire <= 12) {
        tete.style.backgroundImage = 'url("cybergirl_anim/png/grr2.png")';
    } else if (skinAleatoire = 13) {
        tete.style.backgroundImage = 'url("cybergirl_anim/png/grr3.png")';
    }
}


// function animAddRandomWord() {
//   clearInterval(intervalEcoute);
//   clearInterval(intervalEcoute1);
//   clearInterval(intervalEcoute2);
//   clearInterval(intervalParle);
//   clearInterval(intervalParle1);
//   clearInterval(intervalParle2);
//   let skinAleatoire2 = Math.floor(Math.random() * 2) + 1;
//   console.log('skinAleatoire',skinAleatoire);
//   if (skinAleatoire <= 1) {
//     tete.style.backgroundImage = 'url("cybergirl_anim/png/pute1.PNG")';
//   } else 
// }


//  ________________________________________________________________________________________

let temperature = 0;
let distance = 0;
let volume = 0;
let temperature2 = 0;
let distance2 = 0;
let volume2 = 0;

socket.on('arduinoData', (arduinoData) => {
    console.log('Données reçues :', arduinoData);

    const dataArray = arduinoData.split('|');

    temperature = parseFloat(dataArray[0]);
    if (dataArray[1] != "-1")
        distance = parseFloat(dataArray[1]);
    volume = parseFloat(dataArray[2]);
    count = 0;


    if (temperature >= 25) {
        temperature2 = temperature - 25
        if (temperature2 > 0)
            temperature2 = temperature2 * 10;
        stress += temperature2;
        count = 1;
    }
    if (distance <= 40 && distance != -1) {
        distance2 = 40 - distance;
        stress += distance2;
        count = 1;
    }

    if (volume >= 50) {
        volume2 += volume / 25;
        stress += volume2;
        count = 1;
    }

    if (count == 0) {
        stress = stress / 2;
    }


    console.log(stress + 'stress');
    testBarre();

});

// function test() {
//     setInterval(() => {

//         stress = 0;
//         if (temperature >= 25) {
//             temperature2 = temperature - 25
//             if (temperature2 > 0)
//                 temperature2 = temperature2 * 10
//             stress += temperature2
//         }
//         if (distance <= 40) {
//             distance2 = 40 - distance;
//             stress += distance2;
//         }
//         if (volume >= 50) {
//             volume2 += volume / 2, 5;
//             stress += volume2;
//         }
//     }, 500);
//     console.log(stress + 'stress');
//     testBarre();
// }

envoyerQuestion.addEventListener("click", submitQuestion);
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        submitQuestion();
    }
});

barreStress.addEventListener("click", lireTexte);
questionInput.addEventListener("click", animEcoute);
questionInput.addEventListener("click", Ecoute);
addNoise();
animCligne();