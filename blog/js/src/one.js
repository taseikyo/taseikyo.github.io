// $.ajax({
//     type: "POST",
//     url: 'https://api.hibai.cn/api/index/index',
//     dataType: 'json',
//     data: {"TransCode":"030111","OpenId":"123456789","Body":""},
//     success: function(result){
//         var sec = document.querySelector('section')
//         var art = document.createElement('article')
//         art.className = 'post post-type-normal'
//         var div = document.createElement('div')
//         div.className  = 'post-block'
//         // head
//         // var head = document.createElement('header')
//         // head.className = 'post-header'
//         // var h1 = document.createElement('h1')
//         // h1.className = 'post-title'
//         // h1.innerText =  '「ONE · 一个」'
//         // head.appendChild(h1)
//         // body
//         var div_body = document.createElement('div')
//         div_body.className = 'post-body'
//         div_img = document.createElement('div')
//         div_img.className = 'post-gallery'
//         var link = document.createElement('a')
//         link.className = 'post-gallery-img fancybox'
//         var img = document.createElement('img')
//         img.src = result.Body.img_url
//         link.href = result.Body.img_url
//         var img_author = document.createElement('span')
//         img_author.innerText = result.Body.img_kind+" / "+result.Body.img_author
//         img_author.className = 'line'
//         link.appendChild(img)
//         link.appendChild(img_author)

//         div_img.appendChild(link)

//         var text = document.createElement('p')
//         text.innerText = result.Body.word + " —— " + result.Body.word_from

//         div_body.appendChild(div_img)
//         div_body.appendChild(text)

//         // div.appendChild(head)
//         div.appendChild(div_body)

//         art.appendChild(div)

//         foot = document.createElement('footer')
//         foot.className = 'post-footer'
//         div_foot = document.createElement('div')
//         div_foot.className = 'post-eof'
//         foot.appendChild(div_foot)

//         art.appendChild(foot)

//         sec.insertBefore(art, sec.children[0])
        

//         // console.log(result)
//         // $(".description").text(result.Body.word+'   ———— 「ONE · 一个」');
//         return false;
//     }
// });

// API: https://gushi.ci/
$.ajax({
	type: "GET",
	url: "https://api.gushi.ci/all.json",
	success: function(json) {
		// console.log(json["content"]);
		// p = document.querySelector(".site-subtitle");
		// p.innerText = json["content"];
		$(".site-subtitle").text(json["content"]);
		$(".site-subtitle").attr("title", `  《${json["origin"]}》 - ${json["author"]}\n${json["content"]}`);
	}
});