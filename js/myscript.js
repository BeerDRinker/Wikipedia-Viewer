/* Coded by Paliy Rostyslav. e-mail: paliy1984@gmail.com. skype: ros.coprandos */


$(document).ready(function () {

    /* Display random article by click on "Random article" button */

    $('#iamlucky').on("click", function () {

        /* Query to Mediawiki */

        $.ajax({
            url: "https://en.wikipedia.org/w/api.php",
            data: {
                format: "json",
                action: "query",
                prop: "extracts",
                generator: "random",
                grnnamespace: 0
            },
            dataType: 'jsonp',
            success: function (result) {

                $.each(result.query.pages, function (key, page) {

                    $("#randomArticleLink").html('<a href="http://en.wikipedia.org/?curid=' + page.pageid + '">' + page.title + '</a>');

                    $("#randomArticle").html(page.extract);

                    return false;
                });

                $('#article').css('display', 'block');

                $('#articleList').css('display', 'none');

            }
        });
    });


    /* Search in MediaWiki */

    $('#searchButton').on("click", function () {

        var inputVal = $('#field').val();

        var url = "https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=opensearch&gsrnamespace=0&gsrlimit=10&format=json&search=" + inputVal;

        /* Query to Mediawiki */

        $.getJSON(url, function (result) {

            var html = "";

            for (var j = 0; j < result[1].length; j++) {

                html += "<li><a href='" + result[3][j] + "' target='_blank'><div class='result'><h2>" + result[1][j] + "</h2> <p>" + result[2][j] + "</p></div></a></li>"
            }

            $("#articleList").html(html);

            $('#field').val('');

            $('#article').css('display', 'none');

            $('#articleList').css('display', 'block');

        });
    });
});
