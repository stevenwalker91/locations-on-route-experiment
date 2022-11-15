import './style.css';
import * as turf from '@turf/turf';
import { decode, encode } from "@googlemaps/polyline-codec";


//this comes from the strava API - in real life would need to call the end point and parse the response
const encoded = "yn{wInnrOq@p@FFxCeCXKnHs@tAGn@Kz@Cb@F|@XzAn@tG~BhBt@JJ@P?h@CzMFbD@XPb@TTN\\FVDlAf@|\\NhHJfKJjDFrDJzGF`JFtADjBf@r^HX^d@HR?b@EPIHe@HMHeCbDq@hAEP@n@j@zHfB~I\\xBXdH\\bCz@rFdAbMl@zFfBjLj@rC`C`O^vBJPFBb@AFH\\fGl@dEd@tBpApEv@hDz@hG`@~D`@pGf@rEf@~DAPKZoBfBe@f@sAhAwBxBgAx@kAvAu@p@u@t@ORi@tA}AjH[|@cIvKeDvESFWAu@QM?MBYPSVyKvS}IlP_@t@AJ@L|@hDxBvHh@|AnCtIFTDp@?b@BNvBbGR`@f@d@lEhKbCxEzB`EhDfH^p@TR\\JNCLUb@UL?b@XXl@`@hB@PCHm@v@[h@m@lAkI~QeAjBeAbBsAdBkAjA{EdEqCjCa@h@yJdP_AbBy@nAgArAkAjA_@TiKvFEFEVBZLn@FtB?do@BlPFhGDvAHtA~BlRp@hGxCvUV`Br@tDtCtNt@dDTx@T`@hAjBtAnAb@f@l@~@`E~Ih@pAjAtDbI~TDZCXED_Bz@]VoC|AUPs@v@a@`AW~@SxBMv@gBrD]~@I`@Ad@LxAB~@Mz@FFBvADvAZvE@r@At@ObCGdCAhD\\bLn@xZ@nCErDIfPBl@JdAh@`FHbGP|CAPMXgAfBUj@I`AGvD_@tQC`AEREBU?mAKmADmEjAw@X_B^u@Da@?{@CYGYSeByBkAcB}BiD]e@aAaAa@SOCs@CQGwA}@cBq@u@k@oCmDOWmCcDc@y@gAmCWg@[c@eAgA[YMGWB_IzBgCx@u@N}EzAiJlCw@\\gBdAiF~@i@LcANu@P_Bp@]JyAN_A@_AHmBD}P`AmA@aBJe@FqLlC{@`@eDtCc@Rq@JQAUMQScFyI[g@OOOMk@MgBKoBGwAOoCk@wBYoBe@_A_@{CkBcAe@gBc@qCm@w@KqDcASIUQo@Su@c@mEwC{Au@aA[cBe@}B_@aBc@[Qi@k@_CkDg@g@eCcBuBmAoJ_HyAeAi@WwBo@w@Gk@BgANyEx@}A`@oAd@_DtAyAr@sAz@WJYCs@i@cDcDuCqCe@]mAi@k@KUAyAFUBUJSNe@v@gAnCcBlE[j@OLSFcBh@i@BWCi@MsH}CaCeAMCM?[RuI`O{GlLa@n@UT_AL_Fd@oBZuE`@_D\\s@VkAz@iBtAiAjAmAbAWNWBOC[OiEmCU?o@l@GRGn@@TCrBYr@MRc@hBYx@WtAk@jAgB|BOXi@pAYx@Kb@e@bCKxCExCGzA_@fD]hB_B|LgGrh@[hB{@jCE@EA_IcGaGiEkCiBqAs@e@Bs@VQ?GEKQ[aBiA}DOQg@[QOq@gAu@eA[i@Sk@Uw@Ie@c@eDE]Ak@QuBCeABuAPcCHw@z@mGH}@Bg@?qCIgDIu@KkDe@aHe@aISqEIsCA_DBgAVkFd@cIrAiP`AgIPsBLcCTcLV_JN_UB{@J{MHqFFmPNmOTmO?mAF{B\\_D@_@c@wNUyGQiI?wBLkJPoDpAcLfBwLPsBl@kE@i@TgCNoA`@iGDoA?qA@}@MmDD{AGsA?aAKoECuCKeFBm@LsB^cDz@_EpAmDNk@Jy@J{ALuCEcAWuBOmBM_D?_ADk@HYh@aAp@aAz@_Bl@_AtAiBzAo@h@KpAIj@QvAu@|A}@zAu@JKTe@Rq@Js@HmBBoCA}DMuUEeAo@wIEwCl@kn@Vc^MoE?i@JeCNwBb@cDF{A@gDBq@V_CzB}N|AiJfCuPvCgQx@yFRkAN]`AuAtAcBvOiTz@sAxBsDVu@Ny@JqAhBk`@r@sXd@yOJsFLuDVmJHsBj@oJBw@Xoq@AwCEiAE}B@o@`@oGBo@C_BGeA?eADk@N{@tBcHF[AGWa@oAeB]k@e@iAAWFc@R]@@HVa@xAGYIAU[_AsAMUG]RkLJaDNwCXqCpAaITeCJ{AbAsUJyCAs@R_ECwB@aBAy@EaA]mDQaBe@sCGiAKiGkA_i@e@_QwAwm@WuHOaAWc@QCM@ODkAb@M@YMO_@ASJiCHk@v@oEXmBTwCBaCGcHC{F~AaYNcEZu[p@{`ABmBF}AnFot@Hk@Pc@rDiF~@_BjBcD`AwAh@c@^k@Xm@bAoCvFsNx@yBnAuGT{@P]vOmPX_@pGmK~@iA~BeCzAyA`BiBhDmDB?HLBR^zCnF~_@@~ACrDInDOfBYvB?NBLLNn@XXFDGCBQ?IFGG@G`@BRHn@^NRB\\Ah@@h@Ah@IFK?g@J]b@oA|DOz@GbA?`BDzBDn@pAxHV`Ad@xCzAlI|@vFt@vDlAlFh@pB|@pAtEdGn@`AfAnBZz@\\p@lDzHP\\Vn@X~ALbAZjDJbCLj@L^bDjG~@vBf@vA|AdG`B|FlA`DHZLv@DxAGbD@`AE`AOf@Ud@Y\\MHa@Hu@@SFSN]j@u@lBq@bCGZE\\AvB@pIVja@H~C`@zFAdA[xDUlBcArFUfHEx@EZMd@KRoBbDEJCX^|A`BxFxAzFdCzIt@jDhCbJv@nB~E~KZhAfDn[LRV?nD_AbASvKiCpBm@|D}@x@Ot@UtKcJ|CcCTBT\\lFvTTr@PLDALKR[nDsGzJuPzA_CvDwGhDsFZ_@ZYbBmA`FgDn@a@DAJDFTPhBdA`IPlBJrCJhGB`CAzBBbCHbCNvBRhAnAtD`ErKJPB@dAe@jBm@`Aa@tC_BlHuEjAm@x@Wt@K|AE~AN|Cd@rANbEn@jARHHHJLb@?h@SlDE|@@RBRLZPNdDd@~AR`BTn@PvBTv@P~AT`@K`AiArQcUlAuALMXETVzDtJhDdIt@|AJf@TfBTdADn@p@hCHn@FfAAhBWbCEnC?`DG~BCFe@n@QLMUEAe@n@EE"

//strava api returns a encoded polyline so we need to decode it
const myRoute = decode(encoded);

//geoJSON format works with coords the other way around so create a new array with lon and lat swapped
//TODO - revist all this reversing, L.geoJSON supports an optional parameter to do this for you whch would simplify code
const swappedCoords = myRoute.map((element => {
    return element.reverse();
}))

//turn the list of coords into a geoJSON line string and then add a buffer using turf
const myRouteLineString = turf.lineString(swappedCoords);
const buffered = turf.buffer(myRouteLineString, 0.1);

//get the centre point of the route so it can be added to the map (remembering it needs to be reversed)
const centrePoint = turf.center(buffered);
const centreCoords = centrePoint.geometry.coordinates.reverse();

//initialise the map
const map = L.map('map').setView(centreCoords, 12);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//add the route to the map using geoJSON
//if providing to the user, this would show myRouteLineString - but for testing we want to see the buffered route
L.geoJSON(myRouteLineString).addTo(map);

//this stuff here is just for convenience to quickly grab coords for testing
var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(`You clicked the map at  + ${e.latlng.toString()}`)
        .openOn(map);
}
map.on('click', onMapClick);

//create a bounding box around the route - we'll filter to only check locations within this area
const bbox = turf.bbox(buffered);
//map the box into bounds to pass in for the rectangle 
//TODO - set up some variables for minLon, maxLon etc that would contain the boundary points so it could be reused
const bounds = [[bbox[1],bbox[2]],[bbox[3],bbox[0]]];


//this is just for testing so we can see the boundary box
L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);

//array of locations that we'll want to check - assumption is this would come from external location like db
const locations = [[37.853027, -122.223759], [37.831746, -122.251482], [37.825706, -122.213545], [37.85391, -122.240753], [37.851199, -122.22496], [37.84225, -122.247963], [37.822725, -122.236376], [37.850928, -122.212086],[37.853338, -122.212107]];


//this bit is just for generating random locations on the fly so we can quickly test lots of locations - creats new points based on bounding box of the entire map. Extensuon from the above which we would get from db
const mapBounds = map.getBounds();
for (let i=0; i<500; i++) {
    let pointy = turf.randomPoint(1, {bbox: [mapBounds._northEast.lng, mapBounds._northEast.lat, mapBounds._southWest.lng, mapBounds._southWest.lat ]});
    locations.push(pointy.features[0].geometry.coordinates.reverse());
}

//limit locations to only those that show within the bounding box to limit what would be pulled from the database, and reduce computation comparing which are on the route
//in real scenario this would be a database filter rather than filtering the array
const filteredLocations = locations.filter(filt);
function filt(value){
    const minLat = bounds[0][0];
    const maxLat = bounds[1][0];
    const minLon = bounds[0][1];
    const maxLon = bounds[1][1];

    if(value[0] > minLat && value[0] < maxLat && value[1] < minLon && value[1] > maxLon){
        return true;
    }
}

//this is just for testing, wouldn't be needed otherwise - it's just to show on the map locations that have been filtered out and won't be checkd
const removedLocations = locations.filter(element=>!filteredLocations.includes(element));
removedLocations.forEach((location => {
    L.circle(location, {radius: 50, color: "black", fillOpacity: 1}).addTo(map);
}))

//for each location, create a turf point and put it into an array we can iterate over
filteredLocations.forEach((location => {
    let reverse = location.slice().reverse();
    let point = turf.point(reverse);
    
    if (turf.booleanIntersects(buffered, point)) {
        L.circle(location, {radius: 50, color: "green"}).addTo(map);
    } else {
        L.circle(location, {radius: 50, color: "red", fillOpacity: 1}).addTo(map);
    }
}))








