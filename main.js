Webcam.set({

    width:350,
    height:300,
    image_format:"png",
    png_quality: 90
});

Webcam.attach("#Camera");


function Shutter(){
    Webcam.snap(function(data_uri){
        document.getElementById("Snapshot").innerHTML = "<img id='iCloud_Photos' src='"+data_uri+"'>"
    })
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/h9WZKqMzH/model.json", ModelActivated);

function ModelActivated(){
    console.log("Model has been Activated")
}

function Scan(){
    img = document.getElementById("iCloud_Photos");
    classifier.classify(img, gotResults);
}

function unnecessary(){
    synth = window.speechSynthesis;
    voice1 = "The first prediction is" + prediction_1;
    voice2 = "And the second prediction is " + prediction_2;
    utterThis = new SpeechSynthesisUtterance(voice1 + voice2);
    synth.speak(utterThis);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    } else{
        console.log(results)
        document.getElementById("Emotion_Name").innerHTML = results[0].label;
        document.getElementById("Emotion_Name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        unnecessary();
        if(prediction_1 == "Happy"){
            document.getElementById("Emoji_Picture").innerHTML ="&#128522;";
        }
        if(prediction_1 == "Sad"){
            document.getElementById("Emoji_Picture").innerHTML ="&#128546;";
        }
        if(prediction_1 == "Angry"){
            document.getElementById("Emoji_Picture").innerHTML ="&#128545;";
        }
        if(prediction_2 == "Happy"){
            document.getElementById("Emoji_Picture2").innerHTML ="&#128522;";
        }
        if(prediction_2 == "Sad"){
            document.getElementById("Emoji_Picture2").innerHTML ="&#128546;";
        }
        if(prediction_2 == "Angry"){
            document.getElementById("Emoji_Picture2").innerHTML ="&#128545;";
        }


    }
}

