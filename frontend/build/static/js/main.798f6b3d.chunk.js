(this.webpackJsonpwebapp=this.webpackJsonpwebapp||[]).push([[0],Array(47).concat([function(e,t,n){},,,,,,,,,,,,,,,,,,,function(e,t,n){},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(1),s=n.n(a),c=n(19),r=n.n(c),i=n(18),o=n(25),l=(n(47),n(7)),u=n(5),j=n(4),d=n(0),h=Object(a.createContext)(),b=function(e){var t=Object(a.useState)(null!==localStorage.getItem("TOKEN")),n=Object(j.a)(t,2),s={isAuthenticated:n[0],setIsAuthenticated:n[1]};return Object(d.jsx)(h.Provider,{value:s,children:e.children})},m=h,O=Object(a.createContext)(),p=function(e){var t=Object(a.useState)({watch:[],watching:[],watched:[]}),n=Object(j.a)(t,2),s=n[0],c=n[1],r=Object(a.useState)({watch:[],watching:[],watched:[]}),i=Object(j.a)(r,2),o={animeList:s,setAnimeList:c,mangaList:i[0],setMangaList:i[1]};return Object(d.jsx)(O.Provider,{value:o,children:e.children})},f=O,x=n(6),v=n.n(x),g=v.a.create({baseURL:"https://api.jikan.moe/v3/"});n(66);var w=function(e){var t=Object(a.useState)(""),n=Object(j.a)(t,2),s=n[0],c=n[1],r=Object(u.h)();return Object(a.useEffect)((function(){var t="NavLink";r.pathname.includes(e.path)&&(t="".concat(t," ").concat(t,"--active")),c(t)}),[r.pathname,e.path]),Object(d.jsx)(l.b,{className:s,to:e.path,children:e.title})},N=n(14),y=n(15),S=n(17),I=n(16),C=(n(71),function(e){Object(S.a)(n,e);var t=Object(I.a)(n);function n(){return Object(N.a)(this,n),t.apply(this,arguments)}return Object(y.a)(n,[{key:"render",value:function(){return Object(d.jsx)("ul",{className:"AccountOptions",children:Object(d.jsx)("li",{className:"AccountOptions-item",children:Object(d.jsx)(l.b,{to:"/logout",children:"Logout"})})})}}]),n}(s.a.Component));C.contextType=m;var A=Object(u.i)(C);n(72);var k=function(e){return Object(d.jsx)("div",{className:"Navbar",children:Object(d.jsxs)("div",{className:"NavbarInner",children:[Object(d.jsx)("a",{className:"NavbarHeader",href:"/",children:"Project Otaku"}),Object(d.jsxs)("ul",{className:"NavbarNav",children:[Object(d.jsx)("li",{className:"NavbarNav-item",children:Object(d.jsx)(w,{path:"/watchlist",title:"Watchlist"})}),Object(d.jsx)("li",{className:"NavbarNav-item",children:Object(d.jsx)(w,{path:"/browse",title:"Browse"})})]}),Object(d.jsx)(A,{})]})})};n(73);var P=function(e){return Object(d.jsx)("div",{className:"MainContent",children:e.children})};n(74);var T=function(e){var t=Object(a.useState)(""),n=Object(j.a)(t,2),s=n[0],c=n[1],r=Object(u.h)();return Object(a.useEffect)((function(){var t="WatchlistTypeLink";r.pathname===e.path&&(t="".concat(t," ").concat(t,"--active")),c(t)}),[r.pathname,e.path]),Object(d.jsx)(l.b,{className:s,to:e.path,children:e.title})};n(75);var B=function(e){var t=Object(a.useState)(""),n=Object(j.a)(t,2),s=n[0],c=n[1];return Object(a.useEffect)((function(){for(var e=document.getElementsByClassName("KanbanList"),t=0;t<e.length;t++){e[t].childNodes.forEach((function(e){-1===e.textContent.toLowerCase().indexOf(s.toLowerCase())?e.style.display="none":e.style.display="flex"}))}}),[s]),Object(d.jsxs)("div",{className:"WatchlistSearch",children:[Object(d.jsx)("input",{className:"WatchlistSearch-input",type:"text",value:s,placeholder:"Find anime/manga in list.",onChange:function(e){c(e.target.value)}}),""!==s?Object(d.jsx)("button",{className:"WatchlistSearch-button",onClick:function(e){c("")},children:"x"}):null]})};n(76);var _=function(e){return Object(d.jsxs)("div",{className:"WatchlistHeader",children:[Object(d.jsx)(T,{path:"/watchlist/anime",title:"Anime"}),Object(d.jsx)(T,{path:"/watchlist/manga",title:"Manga"}),Object(d.jsx)(B,{})]})},L=n(12),F=n(22);n(77);var K=function(e){return Object(d.jsxs)("div",{className:"KanbanSection",children:[Object(d.jsx)("div",{className:"KanbanSectionHeader",children:Object(d.jsx)("h2",{className:"KanbanSectionHeader-title",children:e.section})}),e.children]})};n(78);var E=function(e){return Object(d.jsx)("div",Object(L.a)(Object(L.a)({className:"KanbanList",ref:e.provided.innerRef},e.provided.droppableProps),{},{children:e.children}))},W=n(24);n(79);var H=function(e){var t=Object(a.useState)(""),n=Object(j.a)(t,2),s=n[0],c=n[1],r=function(){c("shrink"),e.handleDelete(e.item)};return Object(d.jsx)(F.b,{draggableId:e.item.id.toString(),index:e.index,children:function(t){return Object(d.jsxs)("div",Object(L.a)(Object(L.a)(Object(L.a)({className:"KanbanItem KanbanItem--"+s,ref:t.innerRef},t.draggableProps),t.dragHandleProps),{},{children:[Object(d.jsx)("img",{className:"KanbanItem-image",src:e.item.image_url,alt:e.item.title}),Object(d.jsx)("p",{className:"KanbanItem-title",children:e.item.title}),Object(d.jsx)("button",{className:"KanbanItem-delete",onClick:r,children:Object(d.jsx)(W.a,{icon:"trash"})})]}))}})};n(81);var U=function(e){return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("div",{className:"KanbanItemPlaceholder"}),Object(d.jsx)("div",{className:"KanbanItemPlaceholder"}),Object(d.jsx)("div",{className:"KanbanItemPlaceholder"}),Object(d.jsx)("div",{className:"KanbanItemPlaceholder"})]})};n(82);var M=function(e){var t=Object(u.g)(),n=function(n){var a=Object(L.a)({},e.list),s=a[n.status].findIndex((function(e){return e.id===n.id})),c=a[n.status][s-1],r=a[n.status][s+1];if(c){c.next_item_id=r?r.id:null;var i={Authorization:"Token ".concat(localStorage.getItem("TOKEN"))};v.a.put("/api/watchlist/".concat(c.id,"/"),c,{headers:i}).catch((function(e){e.response?401===e.response.status?t.push("/logout"):console.log(e.response.data):t.push("/server-error")}))}a[n.status].splice(s,1),setTimeout((function(){return e.setList(a)}),500);var o={Authorization:"Token ".concat(localStorage.getItem("TOKEN"))};v.a.delete("/api/watchlist/".concat(n.id,"/"),{headers:o}).catch((function(e){e.response?401===e.response.status?t.push("/logout"):console.log(e.response.data):t.push("/server-error")}))};return Object(d.jsx)("div",{className:"Kanban",children:Object(d.jsx)("div",{className:"KanbanWrapper",children:Object(d.jsx)(F.a,{onDragEnd:function(n){var a=n.source,s=n.destination;n.draggableId;if(s){if(a.droppableId===s.droppableId&&a.index===s.index)return;var c=Object(L.a)({},e.list),r=[],i=c[a.droppableId],o=c[s.droppableId],l=i[a.index-1],u=i[a.index+1];l&&(l.next_item_id=u?u.id:null,r.push(l));var j=i.splice(a.index,1)[0];j.status=s.droppableId,o.splice(s.index,0,j),j=o[s.index];var d=o[s.index-1],h=o[s.index+1];d&&(d.next_item_id=j?j.id:null,r.push(d)),j.next_item_id=h?h.id:null,r.push(j),e.setList(c);for(var b=0;b<r.length;b++){var m=r[b],O={Authorization:"Token ".concat(localStorage.getItem("TOKEN"))};v.a.put("/api/watchlist/".concat(m.id,"/"),m,{headers:O}).catch((function(e){e.response?401===e.response.status?t.push("/logout"):console.log(e.response.data):t.push("/server-error")}))}}},children:Object(d.jsx)("div",{className:"KanbanContent",children:["watch","watching","watched"].map((function(t,a){return Object(d.jsx)(K,{section:t,children:Object(d.jsx)(F.c,{droppableId:t,children:function(a){return Object(d.jsx)(E,{provided:a,children:e.isFetchingWatchlist?Object(d.jsx)(U,{}):Object(d.jsxs)(d.Fragment,{children:[e.list[t].map((function(e,t){return Object(d.jsx)(H,{item:e,index:t,handleDelete:n},e.id)})),a.placeholder]})})}})},a)}))})})})})};n(83);var q=function(e){var t=Object(a.useContext)(f),n=t.animeList,s=t.setAnimeList,c=t.mangaList,r=t.setMangaList;return Object(d.jsxs)("div",{className:"Watchlist",children:[Object(d.jsx)(_,{}),Object(d.jsxs)(u.d,{children:[Object(d.jsx)(u.b,{path:"/watchlist/anime",children:Object(d.jsx)(M,{list:n,setList:s,isFetchingWatchlist:e.isFetchingWatchlist})}),Object(d.jsx)(u.b,{path:"/watchlist/manga",children:Object(d.jsx)(M,{list:c,setList:r,isFetchingWatchlist:e.isFetchingWatchlist})}),Object(d.jsx)(u.b,{path:"/watchlist",children:Object(d.jsx)(u.a,{to:"/watchlist/anime"})}),Object(d.jsx)(u.b,{path:"/watchlist/*",children:Object(d.jsx)(u.a,{to:"/404"})})]})]})};n(84);var D=function(e){return Object(d.jsx)("div",{className:"BrowseHeader",children:Object(d.jsx)("h2",{className:"BrowseHeader-title",children:"Browse"})})};n(85);var z=function(e){return Object(d.jsx)("div",{className:"BrowseContent",children:e.children})};n(86);var R=function(e){var t=Object(a.useState)(""),n=Object(j.a)(t,2),s=n[0],c=n[1],r=Object(a.useState)(""),i=Object(j.a)(r,2),o=i[0],l=i[1];return Object(d.jsxs)("form",{className:"BrowseSearchBar",onSubmit:function(t){t.preventDefault(),o!==s&&(e.search(s),l(s))},children:[Object(d.jsx)("input",{className:"BrowseSearchBar-input",type:"text",value:s,placeholder:"Search anime...",onChange:function(e){return c(e.target.value)}}),Object(d.jsx)("button",{className:"BrowseSearchBar-button",type:"submit",children:Object(d.jsx)(W.a,{icon:"search"})})]})};n(87);var J=function(e){var t=Object(a.useState)(""),n=Object(j.a)(t,2),s=n[0],c=n[1],r=Object(a.useState)(!1),i=Object(j.a)(r,2),o=i[0],l=i[1],h=Object(a.useContext)(f),b=h.animeList,m=h.setAnimeList,O=h.mangaList,p=h.setMangaList,x=Object(u.g)();if(Object(a.useEffect)((function(){var t;for(var n in"anime"===e.type?t=b:"manga"===e.type&&(t=O),t){var a=t[n].find((function(t){return t.mal_id===e.item.mal_id}));a&&(l(!0),c("Already in ".concat(a.status,".")))}}),[b,O,e.type,e.item.mal_id]),o)return Object(d.jsx)("div",{className:"AddItem",children:Object(d.jsx)("p",{className:"AddItem-text",children:s})});var g=function(t,n,a){var s,r;if("anime"===e.type)s=b,r=m;else{if("manga"!==e.type)return;s=O,r=p}var i=s[a][0],o={mal_id:n.mal_id,title:n.title,image_url:n.image_url,mal_url:n.url,type:e.type,status:a,next_item_id:i?i.id:null},u={Authorization:"Token ".concat(localStorage.getItem("TOKEN"))};v.a.post("/api/watchlist/",o,{headers:u}).then((function(e){var t=Object(L.a)({},s);t[a].unshift(e.data),r(t),l(!0),c("Added to ".concat(e.data.status))})).catch((function(e){e.response?401===e.response.status?x.push("/logout"):console.log(e.response.data):x.push("/server-error")}))};return Object(d.jsxs)("div",{className:"AddItem",children:[Object(d.jsx)("p",{className:"AddItem-text",children:"Add to:"}),Object(d.jsx)("button",{className:"AddItem-button",type:"button",onClick:function(t){return g(0,e.item,"watch")},children:"Watch"}),Object(d.jsx)("button",{className:"AddItem-button",type:"button",onClick:function(t){return g(0,e.item,"watching")},children:"Watching"}),Object(d.jsx)("button",{className:"AddItem-button",type:"button",onClick:function(t){return g(0,e.item,"watched")},children:"Watched"})]})};n(88);var G=function(e){var t=Object(a.useState)(""),n=Object(j.a)(t,2),s=n[0],c=n[1];return Object(a.useEffect)((function(){e.item.title.length>=40?c(e.item.title.substring(0,39)+"..."):c(e.item.title)}),[e.item.title]),Object(d.jsxs)("div",{className:"BrowseItem",children:[Object(d.jsx)("div",{className:"BrowseItemImage",children:Object(d.jsx)("img",{className:"BrowseItem-img",src:e.item.image_url,alt:e.item.title})}),Object(d.jsx)("div",{className:"BrowseItemDetails",children:Object(d.jsx)("a",{className:"BrowseItem-title",href:e.item.url,title:e.item.url,target:"_blank",rel:"noreferrer",children:s})}),Object(d.jsx)("div",{className:"BrowseItemOptions",children:Object(d.jsx)(J,{item:e.item,type:e.type})})]})};n(89);var Q=function(e){return Object(d.jsx)("div",{className:"BrowseList",children:e.list.map((function(t,n){return Object(d.jsx)(G,{item:t,type:e.type},n)}))})};n(90);var V=function(e){return Object(d.jsxs)("div",{className:"BrowseList",children:[Object(d.jsx)("div",{className:"BrowseItemPlaceholder"}),Object(d.jsx)("div",{className:"BrowseItemPlaceholder"}),Object(d.jsx)("div",{className:"BrowseItemPlaceholder"}),Object(d.jsx)("div",{className:"BrowseItemPlaceholder"}),Object(d.jsx)("div",{className:"BrowseItemPlaceholder"}),Object(d.jsx)("div",{className:"BrowseItemPlaceholder"}),Object(d.jsx)("div",{className:"BrowseItemPlaceholder"}),Object(d.jsx)("div",{className:"BrowseItemPlaceholder"}),Object(d.jsx)("div",{className:"BrowseItemPlaceholder"}),Object(d.jsx)("div",{className:"BrowseItemPlaceholder"})]})};n(91);var X=function(e){var t=Object(a.useState)([]),n=Object(j.a)(t,2),s=n[0],c=n[1],r=Object(a.useState)([]),i=Object(j.a)(r,2),o=i[0],l=i[1],u=Object(a.useState)(!1),h=Object(j.a)(u,2),b=h[0],m=h[1],O=Object(a.useState)(!1),p=Object(j.a)(O,2),f=p[0],x=p[1],v=Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("h3",{children:"Airing"}),Object(d.jsx)(Q,{list:e.airingAnime,type:"anime"})]});return f&&(v=Object(d.jsxs)(d.Fragment,{children:[Object(d.jsxs)("div",{children:[Object(d.jsx)("h3",{children:"Anime"}),Object(d.jsx)(Q,{list:s.slice(0,10),type:"anime"})]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("h3",{children:"Manga"}),Object(d.jsx)(Q,{list:o.slice(0,10),type:"manga"})]})]})),Object(d.jsxs)("div",{className:"Browse",children:[Object(d.jsx)(D,{}),Object(d.jsxs)(z,{children:[Object(d.jsx)(R,{search:function(e){x(!0),m(!0);var t=!0,n=!0;g.get("search/anime?q=".concat(e)).then((function(e){c(e.data.results)})).catch((function(e){console.log(e)})).finally((function(){(t=!1)||n||m(!1)})),g.get("search/manga?q=".concat(e)).then((function(e){l(e.data.results.filter((function(e){return"Manga"===e.type||"Manhwa"===e.type})))})).catch((function(e){console.log(e)})).finally((function(){n=!1,t||n||m(!1)}))}}),b||e.isFetchingAiringAnime?Object(d.jsx)(V,{}):v]})]})};n(92);var Y=function(e){var t=Object(a.useState)(!1),n=Object(j.a)(t,2),s=n[0],c=n[1],r=Object(a.useState)(!1),i=Object(j.a)(r,2),o=i[0],l=i[1],h=Object(a.useState)([]),b=Object(j.a)(h,2),O=b[0],p=b[1],x=Object(a.useContext)(m).isAuthenticated,w=Object(a.useContext)(f),N=w.setAnimeList,y=w.setMangaList,S=Object(u.g)();return Object(a.useEffect)((function(){var e=!0,t=v.a.CancelToken.source();e&&c(!0);var n={Authorization:"Token ".concat(localStorage.getItem("TOKEN"))};return v.a.get("/api/watchlist/",{headers:n,cancelToken:t.token}).then((function(t){var n=t.data,a=function(e){var t={watch:[],watching:[],watched:[]},n=function(n){for(var a=t[n],s=e.filter((function(e){return e.status===n}));0!==s.length;)if(0===a.length){var c=s.findIndex((function(e){return null===e.next_item_id})),r=s.splice(c,1)[0];a.unshift(r)}else!function(){var e=a[0],t=s.findIndex((function(t){return t.next_item_id===e.id})),n=s.splice(t,1)[0];a.unshift(n)}()};for(var a in t)n(a);return t},s=n.filter((function(e){return"anime"===e.type})),c=n.filter((function(e){return"manga"===e.type}));e&&(N(a(s)),y(a(c)))})).catch((function(e){v.a.isCancel(e)?console.log("fetch watchlist canceled."):e.response?401===e.response.status&&S.push("/logout"):console.log(e)})).finally((function(){e&&c(!1)})),function(){e=!1,t.cancel()}}),[N,y,S]),Object(a.useEffect)((function(){var e=!0,t=v.a.CancelToken.source();return e&&l(!0),g.get("season",{cancelToken:t.token}).then((function(t){e&&p(t.data.anime)})).catch((function(e){v.a.isCancel(e)?console.log("fetch airing anime canceled."):console.log(e)})).finally((function(){e&&l(!1)})),function(){e=!1,t.cancel()}}),[]),x?Object(d.jsxs)("div",{className:"Home",children:[Object(d.jsx)(k,{}),Object(d.jsx)(P,{children:Object(d.jsxs)(u.d,{children:[Object(d.jsx)(u.b,{path:"/watchlist",children:Object(d.jsx)(q,{isFetchingWatchlist:s})}),Object(d.jsx)(u.b,{path:"/browse",children:Object(d.jsx)(X,{airingAnime:O,isFetchingAiringAnime:o})}),Object(d.jsx)(u.b,{exact:!0,path:"/",children:Object(d.jsx)(u.a,{to:"/watchlist"})}),Object(d.jsx)(u.b,{path:"*",children:Object(d.jsx)(u.a,{to:"/404"})})]})})]}):Object(d.jsx)(u.a,{to:"/logout"})};n(93);var Z=function(e){return Object(d.jsx)("form",{className:"Form",onSubmit:e.onSubmit,children:e.children})};n(94);var $=function(e){return Object(d.jsx)("h2",{className:"Form-header",children:e.title})};n(95);var ee=function(e){return Object(d.jsx)("ul",{className:"FormErrorList",children:e.errors.map((function(e,t){return Object(d.jsx)("li",{className:"FormErrorList-item",children:e},t)}))})};n(96);var te=function(e){return Object(d.jsx)("input",{className:"Form-field",type:e.type,placeholder:e.fieldname,onChange:e.onChange})};n(97);var ne=function(e){return Object(d.jsx)("button",{className:"Form-button Form-button--"+e.classType,type:e.buttonType,onClick:e.onClick,children:e.text})},ae=function(e){Object(S.a)(n,e);var t=Object(I.a)(n);function n(e){var a;return Object(N.a)(this,n),(a=t.call(this,e)).handleUsername=function(e){a.setState({username:e.target.value})},a.handlePassword=function(e){a.setState({password:e.target.value})},a.validate=function(){var e=[];return""===a.state.username&&e.push("Username is required."),""===a.state.password&&e.push("Password is required."),a.setState({errors:e}),0===e.length},a.login=function(e){e.preventDefault(),a.validate()&&v.a.post("/api/auth/login/",{username:a.state.username,password:a.state.password}).then((function(e){localStorage.setItem("TOKEN",e.data.token),a.context.setIsAuthenticated((function(){return!0})),a.props.history.push("/watchlist")})).catch((function(e){if(e.response){var t=[];e.response.data.non_field_errors&&t.push(e.response.data.non_field_errors),a.setState({errors:t})}else a.props.history.push("/server-error")}))},a.state={username:"",password:"",errors:[]},a}return Object(y.a)(n,[{key:"render",value:function(){return Object(d.jsxs)(Z,{onSubmit:this.login,children:[Object(d.jsx)($,{title:"Sign In"}),0!==this.state.errors.length?Object(d.jsx)(ee,{errors:this.state.errors}):null,Object(d.jsx)(te,{type:"text",fieldname:"username",onChange:this.handleUsername}),Object(d.jsx)(te,{type:"password",fieldname:"password",onChange:this.handlePassword}),Object(d.jsx)(ne,{classType:"primary",buttonType:"submit",text:"Sign In"}),Object(d.jsx)("p",{children:"or"}),Object(d.jsx)(ne,{classType:"secondary",buttonType:"button",text:"Sign Up",onClick:this.props.swapForm})]})}}]),n}(s.a.Component);ae.contextType=m;var se=Object(u.i)(ae),ce=function(e){Object(S.a)(n,e);var t=Object(I.a)(n);function n(e){var a;return Object(N.a)(this,n),(a=t.call(this,e)).handleUsername=function(e){a.setState({username:e.target.value})},a.handlePassword=function(e){a.setState({password:e.target.value})},a.handleConfirmPassword=function(e){a.setState({confirmPassword:e.target.value})},a.validate=function(){var e=[];return""===a.state.username&&e.push("Username is required."),""===a.state.password&&e.push("Password is required."),""===a.state.confirmPassword&&e.push("Confirm Password is required."),a.state.password!==a.state.confirmPassword&&e.push("Passwords didn't match."),a.setState({errors:e}),0===e.length},a.register=function(e){if(e.preventDefault(),a.validate()){var t={username:a.state.username,password:a.state.password};v.a.post("/api/auth/register/",t).then((function(e){v.a.post("/api/auth/login/",t).then((function(e){localStorage.setItem("TOKEN",e.data.token),a.context.setIsAuthenticated((function(){return!0})),a.props.history.push("/watchlist")})).catch((function(e){if(e.response){var t=[];e.response.data.non_field_errors&&t.push(e.response.data.non_field_errors),a.setState({errors:t})}else a.props.history.push("/server-error")}))})).catch((function(e){if(e.response){var t=[];e.response.data.username&&t.push(e.response.data.username),a.setState({errors:t})}else a.props.history.push("/server-error")}))}},a.state={username:"",password:"",confirmPassword:"",errors:[]},a}return Object(y.a)(n,[{key:"render",value:function(){return Object(d.jsxs)(Z,{onSubmit:this.register,children:[Object(d.jsx)($,{title:"Sign Up"}),0!==this.state.errors.length?Object(d.jsx)(ee,{errors:this.state.errors}):null,Object(d.jsx)(te,{type:"text",fieldname:"username",onChange:this.handleUsername}),Object(d.jsx)(te,{type:"password",fieldname:"password",onChange:this.handlePassword}),Object(d.jsx)(te,{type:"password",fieldname:"confirm password",onChange:this.handleConfirmPassword}),Object(d.jsx)(ne,{classType:"primary",buttonType:"submit",text:"Sign Up"}),Object(d.jsx)("p",{children:"or"}),Object(d.jsx)(ne,{classType:"secondary",buttonType:"button",text:"Sign In",onClick:this.props.swapForm})]})}}]),n}(s.a.Component);ce.contextType=m;var re=Object(u.i)(ce),ie=(n(98),function(e){Object(S.a)(n,e);var t=Object(I.a)(n);function n(e){var a;return Object(N.a)(this,n),(a=t.call(this,e)).swapForm=function(){var e;e=a.state.form===se?re:se,a.setState({form:e})},a.state={form:se},a}return Object(y.a)(n,[{key:"render",value:function(){return this.context.isAuthenticated?Object(d.jsx)(u.a,{push:!0,to:"/watchlist"}):Object(d.jsxs)("div",{className:"Auth",children:[Object(d.jsxs)("div",{className:"AuthHeader",children:[Object(d.jsx)("h1",{className:"AuthHeader-title",children:"Project Otaku"}),Object(d.jsx)("p",{className:"AuthHeader-details",children:"Create and manage your anime and manga list."})]}),Object(d.jsx)("div",{className:"UserForm",children:Object(d.jsx)(this.state.form,{swapForm:this.swapForm})})]})}}]),n}(s.a.Component));ie.contextType=m;var oe=ie;n(99);var le=function(e){return Object(d.jsxs)("div",{className:"ServerError",children:[Object(d.jsx)("h1",{children:"There seems to be a problem with the server. Please try again later."}),Object(d.jsx)(l.b,{to:"/",children:"Go back."})]})};var ue=function(e){var t=Object(a.useContext)(m).setIsAuthenticated,n=Object(u.g)();return Object(a.useEffect)((function(){var e={Authorization:"Token ".concat(localStorage.getItem("TOKEN"))};v.a.post("/api/auth/logout/",null,{headers:e}).catch((function(e){})),localStorage.removeItem("TOKEN"),t(!1),n.push("/auth")}),[t,n]),Object(d.jsx)("div",{children:Object(d.jsx)("h1",{children:"Logging out."})})};n(100);var je=function(e){return Object(d.jsxs)("div",{className:"PageNotFound",children:[Object(d.jsx)("h1",{children:"Page Not Found."}),Object(d.jsx)(l.b,{to:"/",children:"Back to homepage."})]})};var de=function(){return Object(d.jsx)(b,{children:Object(d.jsx)(p,{children:Object(d.jsx)(l.a,{children:Object(d.jsxs)(u.d,{children:[Object(d.jsx)(u.b,{path:"/auth",children:Object(d.jsx)(oe,{})}),Object(d.jsx)(u.b,{path:"/logout",children:Object(d.jsx)(ue,{})}),Object(d.jsx)(u.b,{path:"/server-error",children:Object(d.jsx)(le,{})}),Object(d.jsx)(u.b,{path:"/404",children:Object(d.jsx)(je,{})}),Object(d.jsx)(u.b,{path:"/",children:Object(d.jsx)(Y,{})})]})})})})};i.b.add(o.c,o.a,o.b),r.a.render(Object(d.jsx)(s.a.StrictMode,{children:Object(d.jsx)(de,{})}),document.getElementById("root"))}]),[[101,1,2]]]);
//# sourceMappingURL=main.798f6b3d.chunk.js.map