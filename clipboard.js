/**
 * Copyrightⓒ2020 by Moon Hanju (github.com/it-crafts)
 * All rights reserved. 무단전재 및 재배포 금지.
 * All contents cannot be copied without permission.
 */
(async () => {

const common = (() => {
    const IMG_PATH = 'https://it-crafts.github.io/lesson/img';
    const fetchApiData = async (url, page = 'info') => {
        const res = await fetch(url + page);
        const data = await res.json();
        return data.data;
    }
    
    return { IMG_PATH, fetchApiData }
})();

const root = (() => {
    let $el;

    const create = () => {
        $el = document.querySelector('main');
    }

    create();
    return { $el }
})();

const timeline = await (async($parent) => {
    let $el;
    const url = 'https://my-json-server.typicode.com/it-crafts/lesson/timeline/';
    const infoData = await common.fetchApiData(url);
    const totalPage = infoData.totalPage * 1;
    const profileData = infoData.profile;

    const create = () => {
        render();
        $el = $parent.firstElementChild;
    }

    const render = () => {
        $parent.innerHTML = `
            <div class="v9tJq">
                <div class="fx7hk">
                    <a class="_9VEo1 T-jvg" href="javascript:;" data-type="grid"><span aria-label="게시물" class="glyphsSpritePhoto_grid__outline__24__grey_5 u-__7"></span></a>
                    <a class="_9VEo1" href="javascript:;" data-type="feed"><span aria-label="피드" class="glyphsSpritePhoto_list__outline__24__grey_5 u-__7"></span></a>
                    <a class="_9VEo1" href="javascript:;" data-type=""><span aria-label="태그됨" class="glyphsSpriteTag_up__outline__24__blue_5 u-__7"></span></a>
                </div>
            </div>
        `;
    }

    create();
    return { $el, totalPage, profileData, url }
})(root.$el);

const timelineProfile = (($parent, profileData) => {
    let $el;

    const create = () => {
        render(profileData);
        $el = $parent.firstElementChild;
    }

    const scaleDown = numstring => {
        const num = numstring.replace(/,/g, '');
        if(num >= 1000000) {
            return Math.floor(num / 100000) / 10 + '백만'
        }
        if(num >= 1000) {
            return Math.floor(num / 100) / 10 + '천'
        }
        return num;
    };

    const render = (data) => {
        $parent.insertAdjacentHTML('afterbegin', `
            <div>
                <header class="HVbuG">
                    <div class="XjzKX">
                        <div class="RR-M- h5uC0" role="button" tabindex="0">
                            <canvas class="CfWVH" height="91" width="91" style="position: absolute; top: -7px; left: -7px; width: 91px; height: 91px;"></canvas>
                            <span class="_2dbep" role="link" tabindex="0" style="width: 77px; height: 77px;"><img alt="${data.name}님의 프로필 사진" class="_6q-tv" src="${common.IMG_PATH}${data.img}"></span>
                        </div>
                    </div>
                    <section class="zwlfE">
                        <div class="nZSzR">
                            <h1 class="_7UhW9 fKFbl yUEEX KV-D4 fDxYl">${data.name}</h1>
                            <span class="mrEK_ Szr5J coreSpriteVerifiedBadge" title="인증됨">인증됨</span>
                            <div class="AFWDX"><button class="dCJp8 afkep"><span aria-label="옵션" class="glyphsSpriteMore_horizontal__outline__24__grey_9 u-__7"></span></button></div>
                        </div>
                        <div class="Y2E37">
                            <div class="Igw0E IwRSH eGOV_ vwCYk">
                                <span class="ffKix bqE32">
                                    <span class="vBF20 _1OSdk"><button class="_5f5mN jIbKX _6VtSN yZn4P">팔로우</button></span>
                                    <span class="mLCHD _1OSdk"><button class="_5f5mN jIbKX KUBKM yZn4P"><div class="OfoBO"><div class="_5fEvj coreSpriteDropdownArrowWhite"></div></div></button></span>
                                </span>
                            </div>
                        </div>
                    </section>
                </header>
                <div class="-vDIg">
                    <h1 class="rhpdm">${data.title}</h1><br><span>${data.text}</span>
                </div>
                <ul class="_3dEHb">
                    <li class="LH36I"><span class="_81NM2">게시물 <span class="g47SY lOXF2">${data.post}</span></span></li>
                    <li class="LH36I"><a class="_81NM2" href="javascript:;">팔로워 <span class="g47SY lOXF2" title="${data.follower}">${scaleDown(data.follower)}</span></a></li>
                    <li class="LH36I"><a class="_81NM2" href="javascript:;">팔로우 <span class="g47SY lOXF2">${data.follow}</span></a></li>
                </ul>
            </div>
        `);
    }

    create();
    return { $el }
})(timeline.$el, timeline.profileData);

const timelineContent = (($parent) => {
    let $el;

    const create = () => {
        render();
        $el = $parent.lastElementChild;
    }

    const render = () => {
        $parent.insertAdjacentHTML('beforeend', `
            <div class="_2z6nI">
                <div style="flex-direction: column;">
                </div>
            </div>
        `);
    }

    create();
    return { $el }
})(timeline.$el);

const grid = await (async ($parent, url) => {
    let $el, $buttonLatest, $buttonPopular, $inputSearch;

    let page = 1;
    const ITEM_PER_ROW = 3;
    const timelineList = await common.fetchApiData(url, page++);

    const create = () => {
        render();
        $el = $parent.lastElementChild;
        /* FIXME 컴포넌트 내부에서 문서 전체에 대한 DOM 룩업은 지양해주세요
        컴포넌트 밖에 어떤 엘리먼트 들이 있을 지 알 수 없습니다
        엘리먼트 ID는 유일한 게 바람직하나, 충분히 유일하지 않을 수 있습니다
        컴포넌트 내부로직의 영향범위는 컴포넌트 내부로 한정해주세요 */
        $buttonLatest  = document.getElementById('buttonSortByLatest');
        $buttonPopular = document.getElementById('buttonSortByPopular');
        $inputSearch   = document.getElementById('inputSearch');
    }

    const divide = (list, size) => {
        const copy = [...list];
        const cnt = Math.ceil(copy.length / size);
    
        const listList = [];
        for(let i = 0; i < cnt; i++) {
            listList.push(copy.splice(0, size));
        }

        const lastlist = listList[listList.length - 1];
        for(let i = lastlist.length; i < size; i++) {
            lastlist[i] = {};
        }
        
        return listList;
    };
    const listList = divide(timelineList, ITEM_PER_ROW);

    const filter = () => {
        const matchedList = timelineList.filter(data => (data.name + data.text).includes($inputSearch.value));
        if(matchedList.length < 1) return;
        $el.lastElementChild.firstElementChild.innerHTML = '';
        divide(matchedList, ITEM_PER_ROW)
            .forEach(list => gridItem($el.lastElementChild.firstElementChild, list));
    }

    /* TODO 적절한 패턴 적용하여, 조금 더 견고하게 리팩토링 했습니다 (수정완료)
    (참고) sort에 들어가는 콜백 자체를 기반으로 구조를 잡는 것도 고려 해보세요 */
    const calculate = {
        timestamp: (data) => new Date(data.timestamp).getTime(),
        popular: (data) => Number(data.clipCount) + (Number(data.commentCount) * 2),
    }

    /* COMMENT filte리스너와 달리 sort리스너에서는 비즈니스 로직을 별도 메소드로 태우고 있습니다
    sort 메소드에 로직을 응집시키고, 필요시 리스너에서 해야할 일 정도만 분리시키는 게 좋을 것 같습니다
    ex) 부모 엘리먼트에 이벤트 위임을 할 경우, 리스너에서 이벤트를 정제하게 됩니다 */
    const sort = (field) => {
        const sortedList = timelineList.sort((current, next) => calculate[field](next) - calculate[field](current))
        $el.lastElementChild.firstElementChild.innerHTML = '';
        if($inputSearch.value) $inputSearch.value = '';
        divide(sortedList, ITEM_PER_ROW)
            .forEach(list => gridItem($el.lastElementChild.firstElementChild, list));
    }

    const render = () => {
        $parent.insertAdjacentHTML('beforeend', `
            <article class="FyNDV">
                <div class="Igw0E rBNOH YBx95 ybXk5 _4EzTm soMvl JI_ht bkEs3 DhRcB">
                    <button class="sqdOP L3NKy y3zKF JI_ht" id="buttonSortByLatest" type="button">최신순</button>
                    <button class="sqdOP L3NKy y3zKF JI_ht" id="buttonSortByPopular" type="button">인기순</button>
                    <h1 class="K3Sf1">
                        <div class="Igw0E rBNOH eGOV_ ybXk5 _4EzTm">
                            <div class="Igw0E IwRSH eGOV_ vwCYk">
                                <div class="Igw0E IwRSH eGOV_ ybXk5 _4EzTm">
                                    <div class="Igw0E IwRSH eGOV_ vwCYk">
                                        <label class="NcCcD">
                                            <input autocapitalize="none" autocomplete="off" class="j_2Hd iwQA6 RO68f M5V28" id="inputSearch" placeholder="검색" spellcheck="true" type="search" value="" />
                                            <div class="DWAFP">
                                                <div class="Igw0E IwRSH eGOV_ _4EzTm">
                                                    <span aria-label="검색" class="glyphsSpriteSearch u-__7"></span>
                                                </div>
                                                <span class="rwQu7">검색</span>
                                            </div>
                                            <div class="Igw0E rBNOH YBx95 _4EzTm ItkAi O1flK fm1AK TxciK yiMZG"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </h1>
                </div>
                <div>
                    <div style="flex-direction: column; padding-bottom: 0px; padding-top: 0px;">
                    </div>
                </div>
            </article>
        `);
    }

    create();
    /* TODO 지금과 같이, 같은 부모 아래에 동일한 엘리먼트 들에 이벤트를 걸 때는
    부모 엘리먼트에 이벤트를 등록하고, 리스너 내부에서 분기되는 게 성능상 더 바람직합니다 */
    $buttonLatest.addEventListener('click', () => sort('timestamp'));
    $buttonPopular.addEventListener('click', () => sort('popular'));
    $inputSearch.addEventListener('keyup', filter);

    return { $el, listList }
})(timelineContent.$el.firstElementChild, timeline.url);

const gridItem = ($parent, list) => {
    let $el;
    const create = () => {
        render(list);
        $el = $parent.lastElementChild;
    }

    const render = (list) => {
        const html = list.reduce((html, data) => {
            const img = (data.img || '') && `
                <a href="javascript:;">
                    <div class="eLAPa">
                        <div class="KL4Bh">
                            <img class="FFVAD" decoding="auto" src="${common.IMG_PATH}${data.img}" style="object-fit: cover;">
                        </div>
                    </div>
                </a>
            `;
            html += `
                <div class="v1Nh3 kIKUG _bz0w">${img}</div>
            `;
            return html;
        }, '');
        
        $parent.insertAdjacentHTML('beforeend', `
            <div class="Nnq7C weEfm">
                ${html}
            </div>
        `);
    }

    create();
    return { $el }
};

grid.listList.forEach(list => gridItem(grid.$el.lastElementChild.firstElementChild, list));

})();