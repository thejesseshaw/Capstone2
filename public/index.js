
///////////////////////////
//Obtain User Information//
///////////////////////////



function getUserID(user, password) {
    console.log("getUserID function has run");
    $.get('api/users', function(data) {
        for (var i = 0; i < data.length; i++) {
            if (user == data[i].username) {
                var userParam = data[i]._id;
                console.log(userParam);
                console.log(`app/${userParam}`);
                window.location.href = `app/${userParam}`;
                // showResourceInput(data[i]._id);
            }
        }
    })
}

////////////////////////////
////Data Rendering//////////
////////////////////////////

function loadData(userId) {
    $(".grid").empty();
    $.get( `/api/users/${userId}/links`, function( data ) {
        // $("#grid").removeClass("hidden");
        for (var i = 0; i < data.length; i++) {
            let string = data[i].content
            let abrContent = string.substring(0, 140);
            console.log(string);
            if (string.length < 140) {
                abrContent = string;
            }
            else {
                abrContent = string.substring(0, 140);
            }
            $(".grid").append(`
            <section class="resource" id="${data[i]._id}">
                <span><h1>${data[i].title}</h1></span> 
                <span>${abrContent}...</span>
                <img src="${data[i].image}" alt="${data[i].title} resource">
                <section class="clickableitems">
                <span class="link"><button onclick="readMore('${data[i]._id}')">Click Here To Read More</button></span>
                <span class="link"><a href='${data[i].link}' target="_blank"><button>Visit Resource</button></a></span>
                <section class="delete-request" onclick="deleteResource('${data[i]._id}', '${data[i].author}');"><button>Delete</button></section>
                <section class="edit-request" onclick="editResource('${data[i]._id}', '${data[i].author}');"><button>Edit</button></section>
                </section class="clickableitems">
            </section>
            `);
        };
    });
    startMasonry();
}

/////////////////////////////////////////////
/////Hide on Scroll Top Menu on Scroll///////
/////////////////////////////////////////////
/*
$(window).scroll(function() {
    if ($(this).width() > 700) {
        if ($(this).scrollTop()>30)
        {
            $('.small-header').slideUp();
        }
       else
        {
            $('.small-header').slideDown();
        }
    }
});

*/

///////////////////////////
//Load App Page////////////
///////////////////////////

function loadAppPage() {
    console.log("App Page is loading");
}



////////////////
////Register////
////////////////

$(".registerform").on("submit", function(e) {
    e.preventDefault();
    console.log("Register Test");
    let username = $("input.usernameregister").val();
    let password = $("input.passwordregister").val();
    let firstName = $("input.firstname").val();
    let lastName = $("input.lastname").val();
    $.ajax({
        method: "POST",
        url: "/register",
        data: {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName
        },
        success: function() {
            console.log("Post was a success!!!");
            alert("New User has been created");
            window.location.replace('/login');
        },
        error: function() {
            console.log("There was an error! :-(");
        }
    })
})

/////////////////////////////////
////Show Resource Input Form/////
/////////////////////////////////

function showResourceInput(userId) {
    $(".formsection").removeClass("hidden");
    $(".login").addClass("hidden");
    $(".formsection input[type=\"submit\"]").attr("onclick", `submitIt('${userId}')`);
    $("div.refresh > button").attr("onclick", `refreshData('${userId}')`);
}


///Password formating///

$(".passwordregister").blur(function(){
    if ($(".passwordregister").val().length < 10) {
        // alert("Password word must be at least 10 characters and include");
        $(".passwarning1").removeClass("hidden");
        $(".passwordregister").css("background-color", "red");
        stop();
    }
    else {
        $(".passwarning1").addClass("hidden");
    }
})

$(".passwordconfirm").blur(function() {
    var regPass = $(".passwordregister").val();
    var conPass = $(".passwordconfirm").val()
    if (regPass != conPass) {
        // alert("your passwords do not match");
        $(".passwarning2").removeClass("hidden");
        $(".passwordregister, .passwordconfirm").css("background-color", "red");
        return
    }
    else if (regPass == conPass && regPass.length >= 10 && conPass.length >= 10) {
        $(".passwordregister, .passwordconfirm").css("background-color", "green");
        $(".passwarning2").addClass("hidden");
    }
})


////////////////////////////////////////////////////////////////////////////////////
//Submit Username, Password, First Name and Last Name to register //////////////////
////////////////////////////////////////////////////////////////////////////////////





function newUserForm(user) {

    $.get('api/users', function(data) {
        for (var i = 0; i < data.length; i++) {
            if (user == data[i].username) {
                console.log(data[i]._id);
                showResourceInput(data[i]._id);
                $(".contact").removeClass("hidden");
                $(".greeting").html(`Hi ${data[i].firstName}!`);
            }
        }
    })
}




function refreshData(userId) {
    preventDefault();
    console.log("Data has been refreshed");
}

function readMore(userId) {
    console.log(`Read More for ${userId}`);
    $(".grid, .formsection").slideUp();
    $(".readmore").removeClass("hidden");
    $.get('/api/links', function(data) {
        for (var i = 0; i < data.posts.length; i++) {
            if (userId == data.posts[i].id) {
                $(".title").text(data.posts[i].title);
                $(".description-readmore").text(data.posts[i].content);
                $(".sourceimage").attr('src', `${data.posts[i].image}`);
                $(".sourceimage").attr('alt', `${data.posts[i].title} image`);
                $(".link-readmore").text(data.posts[i].link);
                $(".link-readmore").attr('href', `${data.posts[i].link}`);
            }
        }
    });
}

function closeReadMore() {
    console.log("closeReadMore function was executed");
    $(".readmore").addClass("hidden");
    $(".grid").slideDown();
}

function clearForm() {
    console.log("clearFrom function was executed");
    $('.resoure-submit').find("input[type=text], textarea").val("");
    $(".title, .description, .link").val('');
}

/////////////////////////////
////Delete Resource//////////
/////////////////////////////

function deleteResource(id, author) {
    console.log("deleteResource function has run");
    console.log(`Delete resource ${id}`);
    if (confirm('This action will permanently delete this item from your resource list. If you are certain you would like to continue, press OK')) {
        $("#grid").empty();
        $.ajax({
            url: `/api/${id}`,
            type: 'DELETE',
        });
        $("#grid").slideDown();
    }
    else {
        return
    }
    location.reload();
}

/////////////////////////////
////Edit Resource///////////
/////////////////////////////

function editResource(resourceId, userId) {
    console.log("editResource function has run");
    $(".editform").removeClass("hidden");
    $(".formsection, #grid").slideUp();
    $.get(`/api/links`, function(data) {
        for (var i = 0; i < data.posts.length; i++) {
            if (data.posts[i].id == resourceId) {
                $(".edit-title").attr("value", `${data.posts[i].title}`);
                $(".edit-description").html(`${data.posts[i].content}`);
                $(".edit-link").attr("value", `${data.posts[i].link}`);
                $(".edit-imagelink").attr("value", `${data.posts[i].image}`)
                let id = data.posts[i].id;
                $(".editform").submit(function(e){
                    e.preventDefault();
                    let title = $(".edit-title").val();
                    let content = $(".edit-description").val();
                    let url = $(".edit-link").val();
                    let image = $(".edit-imagelink").val();
                    let idPlaceholder = id;
                    let userIdPlaceholder = userId;
                    editIt(idPlaceholder, title, content, url, image, userIdPlaceholder);
                })
            }
        };
    });
};

function editIt(resourceId, title, content, url, image, userId) {
    console.log("editIt function has run");
    $.ajax({
        url: `/api/${resourceId}`,
        method: 'PUT',
        data: {
                id: resourceId,
                title: title,
                content: content,
                link: url,
                image: image
            },
        success: function() {
            closeEdit();
            // $("#grid").empty();
        }
    })
};


///Close Edit Form////
///Update Close Edit Form******

function closeEdit() {
    $(".grid, #contact").slideUp();
    $(".overlay").show();
    setTimeout(myFunction, 5000);
}

/////////////////////////////
////Submit Resource//////////
/////////////////////////////

$(".title").blur(function() {
    title = $(this).val();
    if (title == "") {
        $(".title").css("background-color", "red");
    }
    else {
        $(".title").css("background-color", "green");
        console.log(title);
    }
})

///Main function to submit User Data///


function submitIt(event, userId) {
    event.preventDefault();
    console.log("submitIt function has run");
    // $("#grid").empty();
    var link = $(".link").val();
    if (link.startsWith("http://") || link.startsWith("https://")) {
        console.log("Success!");
    }
    else if (link == null || link == "") {
        console.log("There is no link");
    }
    else {
        link = "http://" + link;
    }
    $.post(`/resources`, {
        link: link,
        author: userId
    });
    $(".grid, #contact").slideUp();
    $(".overlay").show();
    setTimeout(myFunction, 5000);
}

function myFunction() {
    location.reload();    
}

//Show Submit function. this function shows the submit form when user clicks on (+) in header

function showSubmit() {
    console.log("showSubmit function has run");
    $(".formsection").toggleClass("hidden");
    $(".editformsection").addClass("hidden");
}

//Directions for App//

$("#about > div > div > div > h2").on("click", function(e) {
    console.log("Show Directios");
    if( $('.directions').css('display') == 'none' ) {
        $(".directions").slideDown();
     } 
     else {
        $(".directions").slideUp();
     }
})

//Masonry//

function startMasonry() {
    $('.grid').masonry({
        // options
        itemSelector: '.resource',
        // columnWidth: 200,
        horizontalOrder: true,
        fitWidth: true
    });
}

$(document).ready(function(){
    startMasonry();
});

//Cards

$(function(){
        $('#show').on('click',function(){        
            $('.card-reveal').slideToggle('slow');
        });
        
        $('.card-reveal .close').on('click',function(){
            $('.card-reveal').slideToggle('slow');
        });
});



