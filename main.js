$('#users').hide();

	$("button").on("click", function(e) {

		e.preventDefault()
		var $myInput = $("input");
		var gUserName = $myInput.val();

		var githubUrl = "https://api.github.com/search/users?q=" + gUserName;
		
		$.ajax({
	        url: githubUrl,
			dataType: "json",
	        success: function(dDataJson) {

	        	var aUsers = dDataJson.items;
	        	var nNumUsers = aUsers.length;
	        	var sSearchedUsers = "<option value='default'>Please Choose User...</option>";
	        	var oCurrentUser;

	        	for ( var i=0; i<nNumUsers; i++ ) {
	        		oCurrentUser = aUsers[i];
	        		sSearchedUsers += "<option value='" + oCurrentUser.id +"'>" + oCurrentUser.login + "</option>";
	        	};

	        	$("#users").html(sSearchedUsers)    
				
				$('#users').show("slow");
			}



		})

	});

$('#repos').hide();

	$("#users").on("change", function(e) {

  		var $optionSelected = $(this).find("option:selected");
  		var sNameUser = $optionSelected.text();
  		var sIdUser = $optionSelected.val();

  		var repoURL = "https://api.github.com/users/"+sNameUser+"/repos"

  		$.ajax({
	        url: repoURL,
			dataType: "json",
	        success: function( oDataReposJson ) {

	        	var aNumRepos = oDataReposJson;
	        	var nNumRepos = aNumRepos.length;
	     
	           	var sSelectedUserRepos = "<option value='default'>Please Choose Repo...</option>";

	        	for (var i=0; i<nNumRepos; i++) {
	        		var oCurrentUserRepos = aNumRepos[i];
	        		sSelectedUserRepos += "<option value='" + oCurrentUserRepos.id +"'>" + oCurrentUserRepos.name + "</option>"
	        	};

	        	$("#repos").html(sSelectedUserRepos)

	        	$('#repos').show("slow");
	        	
			}



		})

	});

	$('#folders').hide();

	$("#repos").on("change",function(e) {

		var $optionSelected = $(this).find("option:selected");
  		var sNameRepos = $optionSelected.text();
  		var sIdAlbums = $optionSelected.val()

  		var repoFoldersURL = "https://api.github.com/users/repos"

  		$.ajax({
	        url: repoFoldersURL,
			dataType: "json",
	        success: function( oDataRepoFoldersJson ) {
	        	
	        	var nNumFolders = oDataRepoFoldersJson.length;
	        	var aFolders = oDataRepoFoldersJson;
	        	var sRepoFolders = "<option value='default'>Please check files...</option>";

	        	for (var i=0; i<nNumFolders; i++) {
	        		var oCurrentRepoFolders = aTracks[i];
	        	
	        		sRepoFolders += "<option value='" + oCurrentRepoFolders.preview_url +"'>" + oCurrentRepoFolders.name + "</option>";
	        	};

	        	$("#folders").html(sRepoFolders)
	        	
	        	$('#folders').show("slow");
			}
		})
  		
	});