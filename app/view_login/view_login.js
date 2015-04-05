'use strict';

angular.module('transcoding-ui.view_login', ['ngRoute', 'ui.bootstrap', 'LocalStorageModule'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'view_login/view_login.html',
            controller: 'ViewLoginCtrl'
        });
    }])

    .controller('ViewLoginCtrl', ['$scope','$window','localStorageService',function ($scope,$window,localStorageService) {
        var chars = ["A'Karonys", 'Abide', 'Able', 'Abrastal', 'Absi', 'Agayla', 'Ahlrada Ahn', 'Aimless', 'Aloft', 'Amby Bole', 'Amiss', 'Anaster', 'Andarist', 'Anomander Rake', 'Anji', 'Antsy', 'Aparal Forge', "Apsal'ara", 'Apsalar', 'Apt', 'Arahathan', 'Aramala', 'Aranict', 'Arard', 'Aralt Arpat', 'Aranatha', 'Asane', 'Ash', 'Astabb', 'Ay Estos', 'Azra Jael', 'Character', "Ba'ienrok", 'Baaljagg', 'Badalle', 'Badan Gruk', 'Badar', 'Bainisk', 'Bairoth Gild', 'Bakal', 'Balantis', 'Baldick', 'Balgrid', 'Balm', 'Banaschar', 'Barack', 'Baran', 'Barathol Mekhar', 'Baria Setral', 'Baruk', 'Bauchelain', 'Baudin', 'Bavedict', 'Beak', 'Bedek', 'Bek Okhan', 'Belie', 'Bell', 'Bellam Nom', 'Bellig Harn', 'Bellurdan Skullcrusher', 'Ben Adaephon Delat', 'Bendal Home', 'Beneth', 'Bent', 'Beroke Soft Voice', 'Beru', 'Bidithal', 'Binadas Sengar', 'Biri', 'Bivatt', 'Blend', 'Blind', 'Blistig', 'Bluepearl', 'Blues', 'Borduke', 'Bottle', 'Bowl', 'Borrug', 'Braven Tooth', 'Brayderal', "Bre'neigan", 'Breath', 'Brethless', 'Brevity', 'Brohl Handar', 'Brolos haran', 'Brukhalian', 'Brullyg', 'Bruthen Trana', 'Brys Beddict', 'Bubryd', 'Bucklund', 'Bugg', 'Buke', 'Bula', 'Bult', 'Burnt', 'Burnt Rope', 'Buruk the Pale', 'Character', 'Cafal', 'Caladan Brood', 'Calm', 'Calot', 'Cannig Tol', 'Cartographer', 'Chalas', "Challice D'Arle", 'Chase', 'Chaur', 'Chenned', 'Chert', 'Chillbais', 'Choram Irard', 'Circle Breaker', 'Clasp', 'Clip', 'Coll', 'Coltaine', 'Coop', "Corabb Bhilan Thenu'alas", 'Cord', 'Corinn', 'Corlo', 'Cotillion', 'Cowl', 'The Crippled God', 'Crokus Younghand', 'Crone', 'Crump', 'Curdle', 'Cuttle', 'Cynnigig', 'Character', "D'rek", 'Damisk', 'Darist', 'Dassem Ultor', 'Dathenar Fandoris', 'Dayliss', 'Deadsmell', 'Dejim Nebrahl', 'Delist', 'Delum Thord', 'Derudan', 'Desra', 'Dessembrae', 'Detoran', 'Diligence', 'Ditch', 'Doan', 'Draconus', 'Drawfirst', 'Duiker', 'Dujek Onearm', 'Dunsparrow', 'Duryl', 'Character', 'Ebron', 'Edgewalker', 'Eldat Pressan', 'Emancipor Reese', 'Endest Silann', 'Enedictal', 'Enias', 'Equity', 'Erekala', 'The Errant', "Estraysian D'Arle", 'Ethume', 'Exigent', 'Ezgara Diskanar', 'Character', 'Faint', 'Faradan Sort', 'Farakalian', 'Faro Balkat', 'Fast', 'Fayelle', 'Fear Sengar', 'Febryl', 'Felash', 'Felisin Paran', 'Felisin Younger', 'Feather Witch', 'Ferrule', 'Festian', 'Fiddler', 'Fingers', 'Fisher', 'Fisherman', 'Flashwit', 'Freedom', 'Futhgar', 'Character', 'Gaelar Throe', 'Gall', 'Galt', 'Gamet', 'Ganath', 'Ganoes Stabro Paran', 'Ganrod', 'Garath', 'Gaunt-Eye', 'Gaz', 'Gear', 'Gerun Eberict', 'Gesler', 'Gethol', 'Glanno Tarp', 'Glisten', 'Gorlas Vidikas', 'Gothos', 'Gradithan', 'Grave', 'Green Pig', 'Greyfrog', 'Grub', 'Gruntle', 'Gryllen', "Gu'Rull", 'Gullstream', 'Gumble', 'Gunth Mach', "Gunth'an Acyl", 'Character', 'Hadralt', 'Haggraf', 'Hairlock', 'Thalad the Giant', 'Halfpeck', 'Handmaiden', 'Hanut Orr', 'Hanavat', 'Hannan Mosag', 'Hanno', 'Hanradi Khalag', 'Haradas', 'Hareb', 'Harlest', 'Harllo', 'Harllo (Younger)', 'Hattar', 'Hayrith', 'Heboric Light Touch', 'Hedge', 'Hejun', 'Held', 'Hellian', 'Henar Vygulg', 'Henarist', 'Hentos Ilm', 'Hestand', 'Hetan', 'Honey', 'Hood', 'Horult', 'Hostille Rator', 'Hulad', 'Huldo', 'Hulbat', 'Hull Beddict', 'Humble Measure', 'Humbrall Taur', 'Hunt', 'Hurlochel', 'Character', 'Ibb', 'Ibra Gholan', 'Icarium', 'Ilm Absinos', 'Imrahl', 'Imroth', 'Inal', 'Inchers', 'Inistal Ovan', 'Iparth Erule', 'Ipshank', 'Irilta', 'Iron Bars', 'Irp', 'Iskaral Pust', 'Itkovian', 'Character', 'Janall', 'Janath Anar', 'Jarabb', 'Jastara', 'Jerlarkan', 'Jhedel', 'Jhenna', 'Jhess', 'Jibb', 'Job Bole', 'Jorrick Sharplance', 'Jorrude', 'Jula Bole', 'Character', "K'azz D'Avore", "K'rul", 'Kadagar Fant', 'Kadaspala', 'Kalb the Silent Hunter', 'Kahlt', 'Kalam Mekhar', 'Kallor', 'Kalt Urmanal', 'Kalyth', 'Kamist Reloe', 'Karnadas', 'Karos Invictad', 'Karpolan Demesand', 'Karsa Orlong', 'Kasanal', 'Kedeviss', 'Keneb', 'Kerul', 'Kesen', 'Kessgan', 'Kettle', 'Kholb Harat', 'Kig Aven', 'Kilava', 'Kilmandaros', 'Kimloc', 'Kindly', 'Kiska', 'Kisswhere', 'Knuckles', 'Kor Thuran', 'Korbal Broach', 'Korbolo Dom', 'Korlat', 'Koryk', 'Kron', 'Krughava', 'Kruppe', 'Krute of Talient', 'Kulat', 'Kulp', 'Kulpath', 'Kuru Qan', 'Character', "L'oric", 'Lady Envy', 'Laerdas', 'Lanas Tog', 'Lap Twirl', 'Laseen', 'Last', 'Lazan Door', 'Leff', 'Legana Breed', 'Lenestro', 'Leoman of the Flails', 'Lera Epar', 'Letur Anict', 'Lim', 'Limp', 'List', 'Lobe', 'Lock', 'Logros', 'Lookback', 'Lorn', 'Lostara Yil', 'Lubben', 'Lull', 'Lutes', 'Character', "Madan'tul Rada", 'Madrun', 'Malachar', 'Mallet', 'Mallick Rel', 'Mammot', 'Mape', 'Mappo Runt', 'Maral Eb', 'Marble', 'Masan Gilani', 'Masarch', 'Master Quell', 'Mathok', 'Matra Brith', 'Maybe', 'Mayen', 'Mayfly', 'Mebra', 'Meese', 'Melest', 'Menandore (Sister Dawn)', 'Mesker Setral', 'Messremb', 'The Mhybe', 'Midik Buhn', 'Minala', 'Mincer', 'Moak', 'Moby', 'Mogora', 'Mok', 'Monkrat', 'Monok Ochem', 'Moroch Nevath', 'Mosel', 'Mowri', 'Mudslinger', 'Mulch', 'Mulvan Dreader', 'Munug', 'Murillio', 'Myrla', 'Character', 'Nappet', 'Natarkas', 'Nekal Bara', 'Neller', 'Nenanda', 'Nep Furrow', 'Netok', 'Nether', 'Nethpara', 'Nifadas', 'Nightchill', 'Nil', 'Nilbanas', 'Nimander Golit', 'Nisall', 'Nkalian', 'Nok', 'Nom Kala', 'Norul', 'Nose Stream', 'Noto Boil', 'Nulliss', 'Character', 'Obo', 'Ocelot', 'Okral Lom', 'Olar Ethil', 'Old Hunch Arbat', 'Oleg Vikat', "Onos T'oolan", 'Onrack', 'Onyx', "Orbyn 'Truthfinder'", 'Orenas', 'Orfantal', 'Ormly', 'Ormulogun', 'Character', 'Paderunt', 'Pahlk', 'Pallid', 'Panek', 'The Pannion Seer', 'Parald', 'Pearl', 'Pella', 'Phaed', 'Phyrlis', 'Picker', 'Pinosel', 'Pithy', 'Placid', 'Pores', 'Pormqual', 'Possum', 'Pralt', 'Pran Chole', 'Pravalak Rim', 'Prazek Goul', 'Precious Thimble', 'Primly', 'Prist', 'Prophet Seech', 'Pule', 'Pully', 'Pullyk Alar', 'Character', 'Quillas Diskanar', 'Character', 'Raband', 'Raest', 'Ralata', 'Rallick Nom', 'Ramp', 'Ranal', "Rath'Beru", "Rath'Burn", "Rath'Dessembrae", "Rath'D'rek", "Rath'Fanderay", "Rath'Fener", "Rath'Hood", "Rath'Oponn", "Rath'Queen of Dreams", "Rath'Shadowthrone", "Rath'Togg", "Rath'Trake", 'Rautos Hivanar', 'Reccanto Ilk', 'Redmask', 'Reem', 'Reliko', 'Rellock', 'Rethal', 'Reverence', 'Rhulad Sengar', 'Rib', 'Rind', 'Rissarh', 'Roach', 'Rood', 'Ruby', 'Rucket', 'Rudd', 'Rud Ellale', 'Ruffle', 'Rumjugs', 'Runter', "Run'Thurvian", 'Ruthan Gudd', 'Rutt', 'Ryllandaras', 'Rystalle Ev', 'Rythe Bude', 'Rythok', 'Character', 'Sad', 'Saddic', "Sag'Churok", 'Salind', 'Salk Elan', 'Saltlick', 'Samar Dev', 'Sandalath Drukorlat', 'Sands', 'Sathboro Rangar', 'Sawark', 'Scabandari Bloodeye', 'Scant', 'Scillara', 'Scint', 'Scorch', 'Scrawl', 'Scurve', 'Seal', 'Seba Krafar', 'Seerdomin', 'Selush', 'Selv', 'Senu', 'Seren Pedac', 'Serenity', 'Serrat', 'Setoc', "Sha'ik", 'Shadowthrone', 'Shan', 'Shand', 'Shank', 'Shard', 'Shardan Lim', 'Sharl', 'Sheb', 'Shedunul', 'Shelemasa', 'Sheltatha Lore (Daughter Dusk)', 'Shoaly', 'Shortnose', 'Shurq Elalle', 'Sidlis', 'Silanah', 'Silchas Ruin', 'Silgar', 'Silverfox', 'Simtal', 'Sinn', 'Sinter', 'Sirryn Kanar', 'Sister Spite', 'Skanarow', 'Skim', 'Skintick', 'Skorken Kaban', 'Skulldeath', 'Skwish', 'Smiles', 'Snell', 'Sobelone', 'Sordiko Qualm', "Sormo E'nath", 'Spax', 'Spindle', 'Spinnock Durav', 'Squint', 'Stacker', 'Stavi', 'Stillis', 'Stolmen', 'Stonny Menackis', 'Storii', 'Stormy', 'Stahl', 'Strap Mull', 'Straw', 'Strong Rall', 'Studlock', 'Stump', 'Sty', 'Sukul Ankhadu (Sister Dapple)', 'Sulkit', 'Sulmar', 'Sulty', 'Sunrise', 'Surgen Ress', 'Sweetcreek', 'Sweetlard', 'Sweetest Sufferance', 'Synyg', 'Character', "T'Amber", "T'morol", 'Talo Krafar', 'Talamandas', 'Tanal Yathvanar', 'Tanakalian', 'Taralack Veed', 'Tarr', 'Tattersail', 'Tavore Paran', 'Tavos Pond', 'Tayschrenn', 'Taxilian', 'Tehol Beddict', 'Telorast', 'Temul', 'Temper', 'Tene Baralta', 'Thenik the Shattered', 'Theradas Buhn', 'Tholis', 'Thom Tissy', 'Thordy', 'Throatslitter', 'Thurule', "Til'Aras Benok", 'Tiserra', 'Toc the Elder', 'Toc the Younger', 'Toes', 'Tomad Sengar', 'Topper', 'Torahval Delat', 'Torun', 'Torrent', 'Torvald Nom', 'Touchy', 'Travale', 'Treach', 'Trenech', 'Triban Gnol', 'Trissin', 'Trotts', 'Trull Sengar', 'Truth', 'Tulip', 'Tugg', 'Tulas Shorn', 'Tumlit', 'Turban Orr', 'Turble', 'Twist'];

		$scope.hasId = false;
		$scope.session = null;

		if(localStorageService.get("user")){
            $scope.username = localStorageService.get("user");
            $scope.existing_username = $scope.username;
        }else{
            $scope.username = chars[Math.floor(Math.random()*chars.length)]
        }

        $scope.login = function(username){
			var num = Math.floor(Math.random()*1000000);
			localStorageService.set("user",username);
			if(!$scope.hasId && $scope.session!=null){
				localStorageService.set("sessionId",num);
			}else{
				localStorageService.set("sessionId",$scope.session);
			}


			$window.location.assign('#/history');
        };
		
		$scope.showHome = function(){
			var bool = true;
			bool = !localStorageService.get("user");
			return bool;
		};
		
		$scope.path = function(){
			var bool = true;
			var loc = $window.location.href;
			var last = loc.substr(loc.length - 7);
			
			bool = last == 'history';
			//alert(last);
			return bool;
		}

    }]);
