/**
 * 
 * @authors Lewis Tian (chtian@hust.edu.cn)
 * @date    2018-11-09 09:46:29
 */

var get_recommand = () => {
	let api = 'https://anime-music.jijidown.com/api/v2/music';
	fetch(api)
	.then(res => res.json())
	.then(json => {
		// set player title
		document.querySelector('.player .name').innerText = json.res.title + ' - ' + json.res.anime_info.title;

		// set body background image
		let bg = document.createElement('img');
        bg.src = json.res.anime_info.bg;
        bg.onload = function () {
            if (document.querySelectorAll('.bg img').length > 1) {
                document.querySelectorAll('.bg img')[0].className = '';
                setTimeout(function () {
                    document.querySelectorAll('.bg img')[0].remove();
                }, 500);
            }
            this.className = 'show';
        }
        document.querySelector('.bg').append(bg);

        // set player background image
        var logo = document.createElement('img');
        logo.src = json.res.anime_info.logo;
        logo.title = json.res.anime_info.desc;

        logo.onload = function () {
            if (document.querySelectorAll('.player .logo img').length > 1) {
                document.querySelectorAll('.player .logo img')[0].className = '';
                setTimeout(function () {
                    document.querySelectorAll('.player .logo img')[0].remove();
                }, 500);
            }
            this.className = 'show';
        }
        document.querySelector('.player .logo').append(logo);
		
		update_audio(json.res.play_url);

	})
	.catch(error => console.error('Error:', error));

}


var update_audio = (src) => {
    // update audio status
    document.querySelector('.player .control').className = 'control iconfont icon-play';

    let audio = document.querySelector('.progress audio');
    audio.src = src;
    
    audio.addEventListener('canplay', () => update_prograss());
}

var update_prograss = () => {

	// update prograss bar
	let audio = document.querySelector('.progress audio');

	let all = secondToDate(audio.duration);
    let now = secondToDate(audio.currentTime);
    let per = parseInt(audio.currentTime / audio.duration * 100);

	document.querySelector('.player .progress .now').style.width = per + '%';
    document.querySelector('.player .time').innerText = now + '/' + all;

    if (all == now) {
    	document.querySelector('.player .control').className = 'control iconfont icon-play';
    	// document.querySelector('.player .progress .now').style.width = '0';
    }
}

var bind_play_to_position = () => {
	let dom = document.querySelector('.player .progress');
	dom.onclick = (ev) => {
        let oEvent = ev || event;
        let left = oEvent.offsetX;
        let percentage = parseInt(left / dom.offsetWidth * 100);
        let audio = document.querySelector('.progress audio');
        audio.currentTime = audio.duration * (percentage / 100);
    }
}

var play_music = () => {
	let audio = document.querySelector('.progress audio');

	if ( audio.paused ) {
		document.querySelector('.player .control').className = 'control iconfont icon-pause';
		audio.play();
		var prograss = setInterval('update_prograss()', 1000);
	} else {
	    document.querySelector('.player .control').className = 'control iconfont icon-play';
	    audio.pause();
	    clearInterval(prograss);
	}
}

function secondToDate(result) {
    var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
    ret = m + ':' + s;
    return ret == 'NaN:NaN' ? '00:00' : ret;
}

var get_video_info = (av) => {
	let script = document.createElement('script');
    script.src = `https://api.bilibili.com/view?type=jsonp&appkey=8e9fc618fbd41e28&id=${av}&page=1&callback=parse_video_info`;
    document.body.insertBefore(script, document.body.firstChild);
}

var parse_video_info = (response) => {
	if (!response.author) {
		try {
			document.querySelector('body').removeChild(document.querySelector('.card'));
			document.querySelector('#kw').placeholder='在此输入哔哩哔哩 av 号 然后回车查询...';
		} catch(e) {
			document.querySelector('#kw').value='';
			document.querySelector('#kw').placeholder='该视频不存在，请重新输入...';
		}
		return
	}
	let keyword = document.querySelector('.search #kw').value;
	let av = keyword.replace(/[^0-9]+/g, '');
	
	let Ibili = {
		'av': av,
		'author': response.author,
		'mid': response.mid,
		'face': response.face,
		'title': response.title,
		'create_time': response.created_at,
		'description': response.description,
		'cid': response.cid,
		'pic': response.pic,
		'pages': response.list,
		'typename': response.typename,
		'play_count': response.play,
		'danmu': response.video_review,
		'favorites': response.favorites,
		'coins':response.coins
	}
    // set player background image
    let card = document.createElement('div');

    if (document.querySelectorAll('.card').length > 0) {
		document.querySelectorAll('.card')[0].remove();
	}

    card.className='card'
    card.innerHTML = `
		<div class='card-left'>
			<a href=${Ibili.pic}><img src=${Ibili.pic}@160w_100h.webp title=${Ibili.title}/></a> 
		</div>
		<div class='card-right'>
			<div class='card-title' title=${Ibili.title}><a target='_blank' href=https://www.bilibili.com/video/av${Ibili.av}>${Ibili.title}</a></div> 
			<div class='bili-info'>
				<div class='up' title=${Ibili.author}>UP:&nbsp;<a target='_blank' href='https://space.bilibili.com/${Ibili.mid}'>${Ibili.author}</a></div>
				<div class='play-data'>
					<span title='播放量: ${Ibili.play_count}'><i class='fa fa-play-circle-o'></i>&nbsp;${Ibili.play_count}</span>
					<span title='硬币数: ${Ibili.coins}'><i class='fa fa-gg-circle'></i>&nbsp;${Ibili.coins}</span>
					<span title='收藏数: ${Ibili.favorites}'><i class='fa fa-star'></i>&nbsp;${Ibili.favorites}</span>
					<span title='弹幕数: ${Ibili.danmu}'><i class='fa fa-heart'></i>&nbsp;${Ibili.danmu}</span>
				</div>
			</div>
		</div>`

    document.querySelector('body').insertBefore(card, document.querySelector('.search'));

    // store the data
    localStorage.Ibili = JSON.stringify(Ibili);
}


var download = () => {
	let Ibili;
	try {
		Ibili = JSON.parse(localStorage.Ibili);
	} catch(e) {
		return
	}
	let card = document.querySelector('.card');
	let div = document.createElement('div');

	console.log(Ibili.pages.length)

	for (var i = 1; i <= Ibili.pages.length; i++) {
	    let api = `https://api.bilibili.com//playurl?aid=${Ibili.av}&page=${i}&platform=html5&quality=1&vtype=mp4&type=jsonp&token=d3bd9275f0f2cda07f2406740db06c5d&callback=parse_v_link`;
		// p = Ibili.pages[i]
		let script = document.createElement('script');
	    script.src = api;
	    document.body.insertBefore(script, document.body.firstChild);
	}

}

var parse_v_link = (res) => {
	let danmu = res.cid;
	let v_link = res.durl;
	console.log(v_link);
	let card = document.querySelector('.card');
	let bottpm_div = document.createElement('div');

    if (document.querySelectorAll('.card .card-bottom').length > 0) {
        document.querySelectorAll('.card .card-bottom')[0].remove();
    }
	bottpm_div.className = 'card-bottom clear';

	let cid_div = document.createElement('div');
	cid_div.innerHTML = `弹幕:&nbsp;<a target='_blank' href='${danmu}'>${danmu}</a>`;
    cid_div.className = 'danmu';
    bottpm_div.append(cid_div);

    if (v_link.length > 1) {
    	for (var i = 0; i < v_link.length; i++) {
    		let v_div = document.createElement('div');
			v_div.innerHTML = `下载链接(切片${i+1}):&nbsp;<a target='_blank' href='${v_link[i].url}'>${v_link[i].url}</a>`;
		    v_div.className = 'danmu d-link';
	    	bottpm_div.append(v_div);
    	}
    } else {
	    let v_div = document.createElement('div');
		v_div.innerHTML = `下载链接:&nbsp;<a target='_blank' href='${v_link[0].url}'>${v_link[0].url}</a>`;
	    v_div.className = 'danmu d-link';
    	bottpm_div.append(v_div);
    }

    card.append(bottpm_div);
}


var main = function () {
	document.querySelector('.player .next').onclick = () => get_recommand();

	document.querySelector('.player .control').onclick = () => play_music();

	document.querySelector('.search #kw').addEventListener('keydown', e => {
		if (e.keyCode == 13) {
			let keyword = document.querySelector('.search #kw').value;
			let av = keyword.replace(/[^0-9]+/g, '');
			if (av) {
				get_video_info(av);
			}
		}
	});

	document.querySelector('.search-submit').onclick = () => download();

	bind_play_to_position();

	get_recommand();
}

main();