var characters = ["Michael Scott", "Dwight Schrute", "Jim Halpert", "Pam Halpert"]

$("button").on("click", function displayGifs () {
    console.log(this)
    var gifButton = $("<button>");
    gifButton.addClass("character");
    var person = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=EtOsqBhZrXCdR6Pt07tb9IHTx6XC6iIP";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (response) {
        console.log(response)
        var results = response.data;

    for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var personImage = $("<img>");
        personImage.attr("src", results[i].images.fixed_height.url);
        personImage.attr("data-animate", results[i].images.fixed_height_still.url);
        personImage.attr("data-still", results[i].images.fixed_height.url);

        gifDiv.prepend(p);
        gifDiv.prepend(personImage);

        $("#gifs-appear-here").prepend(gifDiv);
    }
    });
});

// $(document).on("click", "#character", displayGifs);
$(document).on("click", "img", function () {
    var state = $(this).attr("data-state");
    console.log(state);
    console.log($(this).attr("data-animate"));
    if (state == "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$("#add-character").on("click", function(event) {
    event.preventDefault();
    console.log ("hello");
    var character = $("#character-input").val().trim();
    if (character == ""){
        return false;
    }
    characters.push(character);

    // displayGifButton();
    var newButton=$("<button>");
    newButton.text(character);
    newButton.attr("data-person", character);

    $("#buttons").append(newButton);

    return false;
});

    // function addNewButton () {
    //     $("#add-character").on("click", function() {
    //         var character = $("character-input").val().trim();
    //         if (character == ""){
    //             return false;
    //         }
    //         topic.push(character);

    //         displayGifButton();
    //         return false;
    //     });
    // }
