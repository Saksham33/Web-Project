var app = angular.module("myApp", ['ngCookies']);

var editor = ace.edit("editor");


// Controller
app.controller("myCtrl", function($scope, $http, $window, $cookies) {

  var count = 0;

// function getAllContent() {

//   var challenge = window.location.hash.substr(1);
//   var challData = {};
//   challData["challenge"] = challenge;

//   $.ajax({
//     url: "//localhost:9090/getChallengeContent/",
//     type: "POST",
//     data: JSON.stringify(challData),
//     cache: false,
//     dataType: 'json',
//     processData: false,
//     contentType: false,
//     success: function(data) {
//       console.log(data);
//     },
//     error: function(error) {
//       console.log("Error in getting supported languages. Please refresh the page, or check your internet connection.")
//     }
//   });
// }

function getEditorThemes() {
  //Getting ace themes from ace_themes.json

  $.ajax({
    url: "ace_themes.json",
    type: "GET",
    success: function(data) {
      setEditorThemes(data);
    },
    error: function(error) {
      showStatusMsg("Error in getting editor themes. Please refresh the page, or check your internet connection.");
    }
  });
}

function setEditorThemes(data) {
  for(key in data) {
    $("#editorTheme").append('<optgroup id="' + key + 'Theme" label="' + key + '"></optgroup>');
    for(secondKey in data[key]) {
      $("#"+key+"Theme").append('<option value="' + data[key][secondKey] + '">' + secondKey + '</option>');
    }
  }
  showStatusMsg("Setting editor themes.");
}

function getSuppotedLanguages() {
  //Getting supported languages by HackerRank api
  $.ajax({
    url: "//localhost:9090/supported_languages",
    type: "GET",
    success: function(data) {
      setSupportedLanguages(data);
    },
    error: function(error) {
      showStatusMsg("Error in getting supported languages. Please refresh the page, or check your internet connection.")
    }
  });
}

function setSupportedLanguages(data) {
  var data = data.languages;
  for(key in data) {
    if(key === "names") {
      for(secondKey in data[key]) {
        var lang = data[key][secondKey];
        var langCode = data["codes"][secondKey];
        if(langCode === 20) {
          //Default language -> javascript | for editor -> part of initialization
          $("#editorLanguage").append('<option selected value="' + langCode + '">' + lang + '</option>');
        } else {
          $("#editorLanguage").append('<option value="' + langCode + '">' + lang + '</option>');
        }
      }
    }
  }
  showStatusMsg("Setting editor supported languages.");
}

function getAceEditorMode(mode) {
  $.ajax({
    url: "ace_modes.json",
    type: "GET",
    success: function(data) {
      var newMode = data.AceModesAccordingToHackerRankCodes[mode];
      if(!newMode) {
        //Mode not available in ace editor
        setAceEditorMode("text");
        showStatusMsg("Mode not available in ace editor, so editor will not be able to highlight text.");
        showStatusMsg("Language Changed");
      } else {
        //Mode available in ace editor
        setAceEditorMode(newMode);
      }
    },
    error: function(error) {
      showStatusMsg("Error in getting editor themes. Please refresh the page, or check your internet connection.");
    }
  });
}

function setAceEditorMode(mode) {
  editor.session.setMode("ace/mode/" + mode);
  showStatusMsg("Language changed.");
}

// Code checker

function showStatusMsg(msg) {
  //Show status message
  $("#status pre").append("\n$ " + msg);
}



    console.log("Inside");
    
    // If user is not logged in, send him/her to login page
    if($cookies.get('login') == 'false') {
      alert('Please login to continue');
      $window.location.href='./index.html';
    }

    $scope.myText = $cookies.get('myUname');

    $scope.checkTeacher = function() {
      if($cookies.get('teacher') == "true")
        return true;
      else
        return false;
    }

    $scope.delAccount = function() {
      // http request to delete account
      $("#passMismatch").css('display', 'none');
      $("#invPass").css('display', 'none');

      var pass1 = $scope.delPass1;
      var pass2 = $scope.delPass2;

      if(pass1 == pass2) {
        $http({
          method: "POST",
          url: "/delAccount/",
          data: {
            userName: $cookies.get('myUname'),
            password: pass1,
          }
        }).then(function(response) {
          if(response.data == "yes") {
            $window.location.href='./index.html';
          }
          else {
            $("#invPass").css('display', 'block');
          }
        });
      }
      else {
        $("#passMismatch").css('display', 'block');
      }
      // window.location.href = "./Quiz.html#/check"
    }

    $scope.changePass = function() {
      $("#passMismatch2").css('display', 'none');
      $("#passMatch").css('display', 'none');

      var oldPass = $scope.changePass1;
      var newPass = $scope.changePass2;

      $http({
        method: "POST",
        url: "/changePass/",
        data: {
          userName: $cookies.get('myUname'),
          currPass: oldPass,
          nextPass: newPass,
        }
      }).then(function(response) {
        if(response.data == "no") {
          $("#passMismatch2").css('display', 'block');
        }
        else {
          $("#passMatch").css('display', 'block');
        }
      });
    }

    $scope.logout = function() {
      $cookies.put('login', 'false');
      $window.location.href='./index.html';
    }

    angular.element(document).ready(function() {

      $("#cust").click(function(){
        $("#custarea").toggle();
      });

      $('#consoleModal').modal('show');

      //Editor initialization
      editor.setTheme("ace/theme/chrome");
      editor.session.setMode("ace/mode/javascript");
      getEditorThemes();
      getSuppotedLanguages();

      //Theme changing
      $('#editorTheme').on('change', function() {
        editor.setTheme(this.value);
        showStatusMsg("Editor Theme Changed: " + this.value);
      });

      //Language Changes
      $('#editorLanguage').on('change', function() {
        getAceEditorMode(this.value);
      });

      //Clear the console
      $("#clearConsole").click(function() {
        $("#status pre").empty();
        $("#status pre").append("$ Console clear");
      });


      $scope.check = window.location.hash.substr(1);  // Get part of url after #
      var challenge = $scope.check;
      console.log("Challenge: " + challenge);

      $http({
        method: "POST",
        url: "/getChallengeContent/",
        data: {
          challenge: challenge,
        }
      }).then(function(response) {
        $scope.res = response.data;
        

        $("#myChall").html($scope.res[0].challenge);
        $("#myStat").html($scope.res[0].statement);
        $("#ipFormat").html($scope.res[0].inputFormat);
        $("#opFormat").html($scope.res[0].outputFormat);
        $("#sampleinput").html($scope.res[0].inputTC[0]);
        $("#sampleoutput").html($scope.res[0].outputTC[0]);
        $("#ExOutput").html($scope.res[0].outputTC[0]);
        console.log($scope.res[0].inputTC[0]);
        $scope.newChar = $scope.res[0].inputTC[0].replace(/\n/g, " ");
        console.log("New " + $scope.newChar);
      });

      // Run code
      $("#runCode").click(function() {
        $("#status pre").empty();   // Clear console

        //Checking code and giving result.
        var language = $("#editorLanguage").val();
        var code = editor.getValue().trim();
        // var testCases = $("#testCases").val();
        // console.log(testCases);
        var testCases = "[\"" + $scope.newChar + "\"]";
        var hackerRankApi = $("#hackerRankApi").val();

        if(code && code.length) {

          if(hackerRankApi && hackerRankApi.length) {

            if(testCases && testCases.length) {

              var data = new FormData();
              data.append("language", language);
              data.append("code", code);
              data.append("testCases", testCases);
              data.append("hackerRankApi", hackerRankApi);

              showStatusMsg("Running code");

              $.ajax({
                url: "//localhost:9090/code_checker",
                type: "POST",
                data: data,
                cache: false,
                dataType: 'json',
                processData: false,
                contentType: false,
                success: function(data) {
                  if(data.result.stderr != "false")
                    showStatusMsg(data.result.stderr);

                  // Check if answer is correct
                  else {
                    var codeRes = data.result.stdout.toString();
                    while(codeRes.charAt(codeRes.length - 1) == "\n" || codeRes.charAt(codeRes.length - 1) == " ")
                      codeRes = codeRes.slice(0, -1);
                    $("#MyOutput").html(codeRes);

                    var correctRes = $scope.res[0].outputTC[0];
                    while(correctRes.charAt(correctRes.length - 1) == " ")
                      correctRes = correctRes.slice(0, -1);

                    if(correctRes == codeRes) {
                      showStatusMsg("Sample test case passed\nYour output:\n" + codeRes);
                    }
                    else {
                      showStatusMsg("No test case passed\nYour output:\n" + codeRes);
                    }

                    // console.log($scope.res[0].outputTC[0]);
                  }
                  // showStatusMsg("Result:\nstdout:\n" + data.result.stdout + "\nstderr:\n" + data.result.stderr);
                },
                error: function(err) {
                  showStatusMsg("Error: " + err);
                }
              });

            } else {
              showStatusMsg("Please enter test cases before submitting.");
            }

          } else {
            showStatusMsg("Please enter Hacker Rank API key before submitting.");
          }

        } else {
          showStatusMsg("Please write some code before submitting.");
        }

      });


      // Submit code
      $("#submitCode").click(function() {
        $("#status pre").empty();   // Clear console

        var totalCount = $scope.res[0].inputTC.length;
        count = 0;
        var i = 0;
        $($scope.res[0].inputTC).each(function(i) {
          console.log("i " + i);
          $scope.newChar = $scope.res[0].inputTC[i].replace(/\n/g, " ");
          var language = $("#editorLanguage").val();
          var code = editor.getValue().trim();
          // var testCases = $("#testCases").val();
          // console.log(testCases);
          var testCases = "[\"" + $scope.newChar + "\"]";
          var hackerRankApi = $("#hackerRankApi").val();

          if(code && code.length) {

            if(hackerRankApi && hackerRankApi.length) {

              if(testCases && testCases.length) {

                var data = new FormData();
                data.append("language", language);
                data.append("code", code);
                data.append("testCases", testCases);
                data.append("hackerRankApi", hackerRankApi);

                showStatusMsg("Code submitted. Processing, please wait.");

                $.ajax({
                  url: "//localhost:9090/code_checker",
                  type: "POST",
                  data: data,
                  cache: false,
                  dataType: 'json',
                  processData: false,
                  contentType: false,
                  success: function(data) {
                    if(data.result.stderr != "false")
                      showStatusMsg(data.res.stderr.toString());
                    else {
                      var codeRes = data.result.stdout.toString();
                      console.log("codeRes\n" + codeRes);
                      while(codeRes.charAt(codeRes.length - 1) == "\n" || codeRes.charAt(codeRes.length - 1) == " ")
                        codeRes = codeRes.slice(0, -1);
                      $("#MyOutput").html(codeRes);

                      var correctRes = $scope.res[0].outputTC[i];
                      console.log("correctRes\n" + correctRes);
                      while(correctRes.charAt(correctRes.length - 1) == " ")
                        correctRes = correctRes.slice(0, -1);

                      if(correctRes == codeRes) {
                        showStatusMsg("Sample test case passed\nYour output:\n" + codeRes);
                        count = count + 1;
                        console.log("Count " + count.toString());
                      }
                      else {
                        showStatusMsg("No test case passed\nYour output:\n" + codeRes);
                      }
                    }
                  },
                  error: function(err) {
                    showStatusMsg("Error: " + err);
                  }
                });

              } else {
                showStatusMsg("Please enter test cases before submitting.");
              }

            } else {
              showStatusMsg("Please enter Hacker Rank API key before submitting.");
            }

          } else {
            showStatusMsg("Please write some code before submitting.");
          }
        });
        alert(count.toString() + " test cases passed");
        console.log("Final count " + count);
      });   // submit code end

    });
});