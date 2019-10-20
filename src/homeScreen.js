//Three.js
import * as THREE from 'three';
import { Interaction } from 'three.interaction';

import FirstPersonControls from './fpscontrols';
FirstPersonControls(THREE);

// Event emitter implementation for ES6
import EventEmitter from 'event-emitter-es6';
import OrbitControls from 'three-orbitcontrols';
import * as dat from 'dat.gui';

// OrbitControls(THREE);
class HomeScene extends EventEmitter {
	constructor(
		domElement = document.getElementById('home_context'),
		_width = window.innerWidth,
		_height = window.innerHeight,
		hasControls = true,
		clearColor = 'blacl',
		currentScene = 1
	) {
		//Since we extend EventEmitter we need to instance it from here
		super();
		(this.ctx = document.body.appendChild(document.createElement('canvas')).getContext('2d')),
			(this.renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true,
			}));

		this.renderer.domElement.style.position = this.ctx.canvas.style.position = 'fixed';
		this.ctx.canvas.style.backgroundImage = 'url(/images/bgTextureImage.png)';
		//Utility
		this.width = _width;
		this.height = _height;

		// THREE Camera
		this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
		this.camera.position.z = 190;
		this.camera.position.x = 130;
		this.camera.position.y = 90;
		// this.camera.lookAt(this.scene.position);
		this.camera.updateMatrixWorld();

		this.renderer = new THREE.WebGLRenderer({
			antialiasing: true,
		});
		domElement.append(this.renderer.domElement);

		this.renderer.setSize(this.width, this.height);

		this.scene2 = new THREE.Scene();

		this.interaction_second = new Interaction(this.renderer, this.scene2, this.camera);
		// bg
		this.loader2 = new THREE.TextureLoader();
		this.loader2.load('/images/bgTextureImage.png', texture => {
			this.scene2.background = texture;
		});
		{
			const color = 0xffffff;
			const intensity = 1;
			const light = new THREE.DirectionalLight(color, intensity);
			light.position.set(0, 10, 0);
			light.target.position.set(-8, 0, 0);
			this.scene2.add(light);
			this.scene2.add(light.target);
		}

		{
			const color = 0xffffff;
			const intensity = 1;
			const light = new THREE.SpotLight(color);
			light.position.set(0, -100, 0);
			this.scene2.add(light);

			// this.helperGrid = new THREE.GridHelper(10, 10);
			// this.helperGrid.position.y = -0.5;
			// this.scene2.add(this.helperGrid);
		}
		// this.camera.position.set(0, 0, 0);
		this.h2 = new THREE.PlaneGeometry(20, 20);
		this.imgSrc2 = '/images/header.png';
		this.mesh2;
		this.tex2 = new THREE.TextureLoader().load(this.imgSrc2, tex => {
			tex.needsUpdate = true;
			this.mesh2.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
		});
		this.material2 = new THREE.MeshBasicMaterial({
			map: this.tex2,
			transparent: true,
		});
		this.mesh2 = new THREE.Mesh(this.h2, this.material2);
		this.mesh2.position.set(0, 6, -10);
		this.scene2.add(this.mesh2);

		//panel
		this.h3 = new THREE.PlaneGeometry(10, 10);
		this.imgSrc3 = '/images/panel.png';
		this.mesh3;
		this.tex3 = new THREE.TextureLoader().load(this.imgSrc3, tex => {
			tex.needsUpdate = true;
			this.mesh3.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
		});
		this.material3 = new THREE.MeshBasicMaterial({
			map: this.tex3,
			transparent: true,
		});
		this.mesh3 = new THREE.Mesh(this.h3, this.material3);
		this.mesh3.position.set(9, -1, -10);
		this.scene2.add(this.mesh3);

		//left
		this.h4 = new THREE.PlaneGeometry(2, 2);
		this.imgSrc4 = '/images/left.png';
		this.mesh4;
		this.tex4 = new THREE.TextureLoader().load(this.imgSrc4, tex => {
			tex.needsUpdate = true;
			this.mesh4.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
		});
		this.material4 = new THREE.MeshBasicMaterial({
			map: this.tex4,
			transparent: true,
		});
		this.mesh4 = new THREE.Mesh(this.h4, this.material4);
		this.mesh4.position.set(-10, -2, -20);
		this.scene2.add(this.mesh4);

		//right
		this.h5 = new THREE.PlaneGeometry(2, 2);
		this.imgSrc5 = '/images/right.png';
		this.mesh5;
		this.tex5 = new THREE.TextureLoader().load(this.imgSrc5, tex => {
			tex.needsUpdate = true;
			this.mesh5.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
		});
		this.material5 = new THREE.MeshBasicMaterial({
			map: this.tex5,
			transparent: true,
		});
		this.mesh5 = new THREE.Mesh(this.h5, this.material5);
		this.mesh5.position.set(5, -2, -20);
		this.scene2.add(this.mesh5);

		//other

		const star_age = ['early', 'middle', 'late', 'dead'];
		const star_color = ['yellow', 'red', 'blue', 'white', 'brown', 'green'];
		const tyep_planet = ['ice', 'rocky', 'gas'];
		const star_size = [3, 5];
		const star_temp = [
			'1,800 - 3,500 °C',
			'3,500 - 5,000 °C',
			'5,000 - 7,300 °C',
			'4,000 - 150,000 °C',
			'7,300 - 200,000 °C',
		];
		this.iStarColor = 0;
		this.iStarsize = 0;

		// button1
		this.h6 = new THREE.PlaneGeometry(1, 1);
		this.imgSrc6 = '/images/right.png';
		this.mesh6;
		this.tex6 = new THREE.TextureLoader().load(this.imgSrc6, tex => {
			tex.needsUpdate = true;
			this.mesh6.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
		});
		this.material6 = new THREE.MeshBasicMaterial({
			map: this.tex6,
			transparent: true,
		});
		this.mesh6 = new THREE.Mesh(this.h6, this.material6);
		this.mesh6.position.set(11, 2, -10);
		this.scene2.add(this.mesh6);

		// button 1
		this.h6left = new THREE.PlaneGeometry(1, 1);
		this.imgSrc6left = '/images/left.png';
		this.mesh6left;
		this.tex6left = new THREE.TextureLoader().load(this.imgSrc6left, tex => {
			tex.needsUpdate = true;
			this.mesh6left.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
		});
		this.material6left = new THREE.MeshBasicMaterial({
			map: this.tex6left,
			transparent: true,
		});
		this.mesh6left = new THREE.Mesh(this.h6left, this.material6left);
		this.mesh6left.position.set(8, 2, -10);
		this.scene2.add(this.mesh6left);

		// color text

		this.colorText = new THREE.PlaneGeometry(4, 4);
		this.ImgSRccolorText = '/images/color.png';
		this.meshcolorText;
		this.texcolorText = new THREE.TextureLoader().load(this.ImgSRccolorText, tex => {
			tex.needsUpdate = true;
			this.meshcolorText.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
		});
		this.materialcolorText = new THREE.MeshBasicMaterial({
			map: this.texcolorText,
			transparent: true,
		});
		this.meshcolorText = new THREE.Mesh(this.colorText, this.materialcolorText);
		this.meshcolorText.position.set(9.5, 2, -10);
		this.scene2.add(this.meshcolorText);

		var geometry = new THREE.SphereGeometry(5, 9, 9);
		var material = new THREE.MeshPhongMaterial({
			color: 'red',
		});

		// // this.mesh6left.cursor = 'pointer';
		// this.mesh6left.on('click', ev => {
		// 	console.log('i am here', ev);
		// 	this.sphere.material.color.set('green');
		// 	// currentScene = 2;
		// 	// this.renderer.clear();
		// 	// console.log('scene', currentScene);
		// 	// this.camera.position.set(0, 0, 0);
		// 	// this.update(this.scene2, this.camera);
		// 	return currentScene;
		// });

		// adding font

		// this.loaderFont = new THREE.FontLoader();

		// this.loaderFont.load('/fonts/SulphurPoint_Regular.json', font => {
		// 	var geometryFont = new THREE.TextGeometry('Hels!', {
		// 		font: font,
		// 		size: 1,
		// 		height: 1,
		// 		// curveSegments: 1,
		// 		// bevelEnabled: true,
		// 		// bevelSize: 1,
		// 		// bevelOffset: 0,
		// 		// bevelSegments: 0,
		// 	});
		// 	var textMaterial = new THREE.MeshBasicMaterial({ color: 'white' });

		// 	var mesh = new THREE.Mesh(geometryFont, textMaterial);
		// 	mesh.position.set(0, 0, -8);
		// 	mesh.rotation.z = -0.5;
		// 	this.scene2.add(mesh);
		// });

		///////////

		this.h7 = new THREE.PlaneGeometry(1, 1);
		this.imgSrc7 = '/images/right.png';
		this.mesh7;
		this.tex7 = new THREE.TextureLoader().load(this.imgSrc7, tex => {
			tex.needsUpdate = true;
			this.mesh7.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
		});
		this.material7 = new THREE.MeshBasicMaterial({
			map: this.tex7,
			transparent: true,
		});
		this.mesh7 = new THREE.Mesh(this.h7, this.material7);
		this.mesh7.position.set(11, 0, -10);
		this.scene2.add(this.mesh7);

		// button 1
		this.h7left = new THREE.PlaneGeometry(1, 1);
		this.imgSrc7left = '/images/left.png';
		this.mesh7left;
		this.tex7left = new THREE.TextureLoader().load(this.imgSrc7left, tex => {
			tex.needsUpdate = true;
			this.mesh7left.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
		});
		this.material7left = new THREE.MeshBasicMaterial({
			map: this.tex7left,
			transparent: true,
		});
		this.mesh7left = new THREE.Mesh(this.h7left, this.material7left);
		this.mesh7left.position.set(8, 0, -10);
		this.scene2.add(this.mesh7left);
		// color text

		this.sizetext = new THREE.PlaneGeometry(4, 4);
		this.ImgSRcsizetext = '/images/size.png';
		this.meshsizetext;
		this.texsizetext = new THREE.TextureLoader().load(this.ImgSRcsizetext, tex => {
			tex.needsUpdate = true;
			this.meshsizetext.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
		});
		this.materialsizetext = new THREE.MeshBasicMaterial({
			map: this.texsizetext,
			transparent: true,
		});
		this.meshsizetext = new THREE.Mesh(this.sizetext, this.materialsizetext);
		this.meshsizetext.position.set(9.5, 0, -10);
		this.scene2.add(this.meshsizetext);

		var geometry = new THREE.SphereGeometry(5, 9, 9);
		var material = new THREE.MeshPhongMaterial({
			color: 'red',
		});

		this.sphere = new THREE.Mesh(geometry, material);
		this.sphere.position.set(-2, -2, -18);
		this.sphere.material.color.set(star_color[this.iStarColor]);
		//  {
		// 		const mtlLoader = new THREE.MTLLoader();
		// 		mtlLoader.load('/images/bg/windmill.mtl', mtlParseResult => {
		// 			const objLoader = new THREE.OBJLoader2();
		// 			const materialsfghj = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
		// 			objLoader.addMaterials(materialsfghj);
		// 			objLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj', root => {
		// 				root.position.set(-2, -2, -18);

		// 				this.scene2.add(root);
		// 			});
		// 		});
		//  }
		this.scene2.add(this.sphere);

		// const objloader = new THREE.OBJLoader2();
		// objloader.load

		this.mesh6left.on('click', () => {
			if (this.iStarColor == star_color.length - 1) {
				this.iStarColor = 0;
			} else {
				this.iStarColor = this.iStarColor + 1;
			}

			this.sphere.material.color.set(star_color[this.iStarColor]);
		});

		this.mesh6.on('click', () => {
			if (this.iStarColor == 0) {
				this.iStarColor = star_color.length - 1;
			} else {
				this.iStarColor = this.iStarColor - 1;
			}
			this.sphere.material.color.set(star_color[this.iStarColor]);
		});

		this.mesh7.on('click', () => {
			if (this.iStarsize == star_size.length - 1) {
				this.iStarsize = 0;
			} else {
				this.iStarsize = this.iStarsize + 1;
			}

			this.sphere.scale.x = star_size[this.iStarsize];
			this.sphere.scale.y = star_size[this.iStarsize];
			this.sphere.scale.z = star_size[this.iStarsize];
		});

		this.mesh7left.on('click', () => {
			if (this.iStarsize == 0) {
				this.iStarsize = star_size.length - 1;
			} else {
				this.iStarsize = this.iStarsize - 1;
			}
			this.sphere.scale.x = star_size[this.iStarsize];
			this.sphere.scale.y = star_size[this.iStarsize];
			this.sphere.scale.z = star_size[this.iStarsize];
		});
		this.options = {
			velx: 0,
			vely: 0.01,
			camera: {
				speed: 0.0001,
			},
			stop: function() {
				this.velx = 0;
				this.vely = 0;
			},
			reset: function() {
				this.velx = 0.1;
				this.vely = 0.1;
				this.camera.position.z = 75;
				this.camera.position.x = 0;
				this.camera.position.y = 0;
				this.sphere.scale.x = 1;
				this.sphere.scale.y = 1;
				this.sphere.scale.z = 1;
				this.sphere.material.wireframe = true;
			},
		};
		var gui = new dat.GUI();

		// var cam = gui.addFolder('Camera');
		// cam.add(this.options.camera, "speed", 0, 0.001).listen();
		// cam.add(this.camera.position, 'y', 0, 100).listen();
		// cam.open();

		var velocity = gui.addFolder('Velocity');
		// velocity
		//   .add(this.options, "velx", -0.2, 0.2)
		//   .name("X")
		//   .listen();
		velocity
			.add(this.options, 'vely', -0.2, 0.2)
			.name('Y')
			.listen();
		velocity.open();

		var box = gui.addFolder('Cube');
		var testVal = box.add(this.sphere.scale, 'x', 0, 3).name('D');
		// console.log("testVal", testVal.getValue());
		testVal.onChange(t => {
			this.sphere.scale.y = t;
			this.sphere.scale.z = t;

			// console.log(t);
		});
		testVal.listen();

		// box
		//   .add(this.sphere.scale, "y", 0, 3)
		//   .name("Height")
		//   .listen();
		// box
		//   .add(this.sphere.scale, "z", 0, 3)
		//   .name("Length")
		//   .listen();
		box.add(this.sphere.material, 'wireframe').listen();
		box.open();

		gui.add(this.options, 'stop');
		gui.add(this.options, 'reset');
		//scene 1

		//THREE scene
		this.scene = new THREE.Scene();

		// this.renderer.setClearColor(new THREE.TextureLoader(clearColor));

		// new a interaction, then you can add interaction-event with your free style
		this.interaction = new Interaction(this.renderer, this.scene, this.camera);

		//Push the canvas to the DOM

		// this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		// this.controls.update();

		// bg
		this.loader = new THREE.TextureLoader();
		this.loader.load('/images/bgTextureImage.png', texture => {
			this.scene.background = texture;
		});

		// heading text select game
		// this.loaderHeader = new THREE.TextureLoader();
		// this.loaderHeader.load('/images/chooseyourgame.png', texture => {
		// 	this.scene.add(texture);
		// });

		// Create a texture loader so we can load our image file
		this.loaderHeader = new THREE.TextureLoader();

		// Load an image file into a custom material
		this.materialHeader = new THREE.MeshLambertMaterial({
			map: this.loaderHeader.load('/images/chooseyourgame.png'),
		});

		// create a plane geometry for the image with a width of 10
		// and a height that preserves the image's aspect ratio
		this.headerGeometry = new THREE.PlaneGeometry(300, 300);
		this.imgSrc = '/images/logo.png';
		this.mesh;
		this.tex = new THREE.TextureLoader().load(this.imgSrc, tex => {
			tex.needsUpdate = true;
			this.mesh.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
		});
		this.material = new THREE.MeshBasicMaterial({
			map: this.tex,
			transparent: true,
		});
		this.mesh = new THREE.Mesh(this.headerGeometry, this.material);
		this.mesh.position.set(150, 200, 0);
		this.scene.add(this.mesh);
		// this.scene2.add(this.mesh);
		// START GAME IMAGE

		this.startGameButtonGeometry = new THREE.PlaneGeometry(200, 150);
		this.imgSrcStart = '/images/startGame.png';
		this.meshStartButton;
		this.tex = new THREE.TextureLoader().load(this.imgSrcStart, tex => {
			tex.needsUpdate = true;
			this.meshStartButton.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
		});
		this.materialStartButton = new THREE.MeshBasicMaterial({
			map: this.tex,
			transparent: true,
		});
		this.meshStartButton = new THREE.Mesh(this.startGameButtonGeometry, this.materialStartButton);
		this.meshStartButton.position.set(250, 110, 0);
		this.scene.add(this.meshStartButton);
		this.meshStartButton.cursor = 'pointer';
		this.meshStartButton.on('click', ev => {
			console.log('i am here', ev);
			currentScene = 3;
			this.renderer.clear();
			console.log('scene', currentScene);
			this.camera.position.set(0, 0, 0);
			this.update(this.sceneStarInfo, this.camera);
			return currentScene;
		});

		this.INFOButtonGeometry = new THREE.PlaneGeometry(200, 150);
		this.imgSrcINFO = '/images/INFO.png';
		this.meshINFOButton;
		this.tex = new THREE.TextureLoader().load(this.imgSrcINFO, tex => {
			tex.needsUpdate = true;
			this.meshINFOButton.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
		});
		this.materialStartButton = new THREE.MeshBasicMaterial({
			map: this.tex,
			transparent: true,
		});
		this.meshINFOButton = new THREE.Mesh(this.INFOButtonGeometry, this.materialStartButton);
		this.meshINFOButton.position.set(250, 50, 0);
		this.scene.add(this.meshINFOButton);
		this.meshINFOButton.cursor = 'pointer';
		this.meshINFOButton.on('click', ev => {
			console.log('i am here', ev);
			currentScene = 2;
			this.renderer.clear();
			console.log('scene', currentScene);
			this.camera.position.set(0, 0, 0);

			this.update(this.scene2, this.camera);
			return currentScene;
		});

		this.creditsButtonGeometry = new THREE.PlaneGeometry(200, 150);
		this.imgSrcCredits = '/images/credits.png';
		this.meshcreditsButton;
		this.tex = new THREE.TextureLoader().load(this.imgSrcCredits, tex => {
			tex.needsUpdate = true;
			this.meshcreditsButton.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
		});
		this.materialStartButton = new THREE.MeshBasicMaterial({
			map: this.tex,
			transparent: true,
		});
		this.meshcreditsButton = new THREE.Mesh(this.creditsButtonGeometry, this.materialStartButton);
		this.meshcreditsButton.position.set(250, -10, 0);
		this.scene.add(this.meshcreditsButton);
		this.meshcreditsButton.cursor = 'pointer';
		this.meshcreditsButton.on('click', ev => {
			console.log('i am here', ev);
			currentScene = 2;
			this.renderer.clear();
			console.log('scene', currentScene);
			this.camera.position.set(0, 0, 0);

			this.update(this.scene2, this.camera);
			return currentScene;
		});
		//Objects
		var starColor = (function() {
			var colors = [0xffff00, 0x559999, 0xff6339, 0xffffff];
			return colors[Math.floor(Math.random() * colors.length)];
		})();

		this.star = new THREE.Mesh(
			new THREE.SphereGeometry(5, 32, 32),
			new THREE.MeshBasicMaterial({
				color: 0xffffff,
			})
		);
		this.glows = [];

		this.star.castShadow = false;
		this.scene.add(this.star);

		for (var i = 1, scaleX = 1.1, scaleY = 1.1, scaleZ = 1.1; i < 5; i++) {
			var starGlow = new THREE.Mesh(
				new THREE.SphereGeometry(5, 32, 32),
				new THREE.MeshBasicMaterial({
					color: starColor,
					transparent: true,
					opacity: 0.5,
				})
			);
			starGlow.castShadow = false;
			scaleX += 0.4 + Math.random() * 0.5;
			scaleY += 0.4 + Math.random() * 0.5;
			scaleZ += 0.4 + Math.random() * 0.5;
			starGlow.scale.set(scaleX, scaleY, scaleZ);
			starGlow.origScale = {
				x: scaleX,
				y: scaleY,
				z: scaleZ,
			};
			this.glows.push(starGlow);
			this.scene.add(starGlow);
		}

		var planetColors = [
			0x333333, //grey
			0x993333, //ruddy
			0xaa8239, //tan
			0x2d4671, //blue
			0x599532, //green
			0x267257, //bluegreen
		];
		this.planets = [];

		for (var p = 0, radii = 0; p < 4; p++) {
			var size = 4 + Math.random() * 7,
				type = Math.floor(Math.random() * planetColors.length),
				roughness = Math.random() > 0.6 ? 1 : 0,
				planetGeom = new THREE.Mesh(
					new THREE.IcosahedronGeometry(size, roughness),
					new THREE.MeshLambertMaterial({
						color: planetColors[type],
						shading: THREE.FlatShading,
					})
				),
				planet = new THREE.Object3D();

			planet.add(planetGeom);

			if (type > 1 && Math.random() > 0.5) {
				var atmoGeom = new THREE.Mesh(
					new THREE.IcosahedronGeometry(size + 1.5, roughness),
					new THREE.MeshLambertMaterial({
						color: planetColors[3],
						shading: THREE.FlatShading,
						transparent: true,
						opacity: 0.5,
					})
				);

				atmoGeom.castShadow = false;
				planet.add(atmoGeom);
			}

			//radii is order
			planet.orbitRadius = Math.random() * 50 + 50 + radii; //?? location of the radius
			planet.rotSpeed = 0.005 + Math.random() * 0.01;
			planet.rotSpeed *= Math.random() < 0.1 ? -1 : 1;
			planet.rot = Math.random();
			planet.orbitSpeed = (0.02 - p * 0.0048) * 0.25;
			planet.orbit = Math.random() * Math.PI * 2; //
			planet.position.set(planet.orbitRadius, 0, 0);

			radii = planet.orbitRadius + size;
			this.planets.push(planet);
			this.scene.add(planet);

			var orbit = new THREE.Line(
				new THREE.CircleGeometry(planet.orbitRadius, 90),
				new THREE.MeshBasicMaterial({
					color: 0xffffff,
					transparent: true,
					opacity: 0.1,
					side: THREE.BackSide,
				})
			);

			orbit.geometry.vertices.shift();
			orbit.rotation.x = THREE.Math.degToRad(90);
			this.scene.add(orbit);
		}

		//Lights
		var light1 = new THREE.PointLight(starColor, 2, 0, 0);

		light1.position.set(0, 0, 0);
		this.scene.add(light1);

		var light2 = new THREE.AmbientLight(0x090909);
		this.scene.add(light2);

		//2D
		this.bgStars = [];

		for (var i = 0; i < 500; i++) {
			var tw = {
				x: Math.random(),
				y: Math.random(),
			};

			this.bgStars.push(tw);
		}

		this.t = 0;

		{
			const color = 0xffffff;
			const intensity = 1;
			const light = new THREE.DirectionalLight(color, intensity);
			light.position.set(0, 10, 0);
			light.target.position.set(-8, 0, 0);
			this.scene.add(light);
			this.scene.add(light.target);
		}

		{
			const color = 0xffffff;
			const intensity = 1;
			const light = new THREE.SpotLight(color);
			light.position.set(0, -100, 0);
			this.scene.add(light);

			this.helperGrid = new THREE.GridHelper(10, 10);
			this.helperGrid.position.y = -0.5;
			this.scene.add(this.helperGrid);
		}

		// STAR SCENE INFO (3)

		this.sceneStarInfo = new THREE.Scene();

		this.loader3 = new THREE.TextureLoader();
		this.loader3.load('/images/bgTextureImage.png', texture => {
			this.sceneStarInfo.background = texture;
		});
		{
			const color = 0xffffff;
			const intensity = 1;
			const light = new THREE.DirectionalLight(color, intensity);
			light.position.set(0, 10, 0);
			light.target.position.set(-8, 0, 0);
			this.sceneStarInfo.add(light);
			this.sceneStarInfo.add(light.target);
		}

		{
			const color = 0xffffff;
			const intensity = 1;
			const light = new THREE.SpotLight(color);
			light.position.set(0, -100, 0);
			this.sceneStarInfo.add(light);

			// this.helperGrid = new THREE.GridHelper(10, 10);
			// this.helperGrid.position.y = -0.5;
			// this.scene2.add(this.helperGrid);
		}

		// header for star info

		this.headerdifferentTypeStar = new THREE.PlaneGeometry(20, 20);
		this.imgSrcdifferentTypeStar = '/images/differentTypeStar.png';
		this.meshdifferentTypeStar;
		this.texdifferentTypeStar = new THREE.TextureLoader().load(this.imgSrcdifferentTypeStar, tex => {
			tex.needsUpdate = true;
			this.meshdifferentTypeStar.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
		});
		this.materialdifferentTypeStar = new THREE.MeshBasicMaterial({
			map: this.texdifferentTypeStar,
			transparent: true,
		});
		this.meshdifferentTypeStar = new THREE.Mesh(this.headerdifferentTypeStar, this.materialdifferentTypeStar);
		this.meshdifferentTypeStar.position.set(0, 6, -10);
		this.sceneStarInfo.add(this.meshdifferentTypeStar);
		this.interaction_startInfo = new Interaction(this.renderer, this.sceneStarInfo, this.camera);

		//Options

		const dwarf = 3;
		const giant = 5;
		//

		const star_example = [
			{
				color: 'red',
				temp: '1,800 - 3,500 °C',
				age: 'middle',
				size: 'dwarf',
				descImage: '/images/reddwarf.jpg',
				scale: 3,
			},
			{
				color: 'red',
				temp: '3,000 - 5,000 °C',
				age: 'late',
				size: 'giant',
				descImage: '/images/redgi.jpg',
				scale: 5,
			},
			{
				color: 'yellow',
				temp: '5,000 - 7,300 °C',
				age: 'early',
				size: 'dwarf',
				descImage: '/images/yellow.jpg',
				scale: 3,
			},

			{
				color: 'blue',
				temp: '7,300 - 200,000 °C',
				age: 'middle',
				size: 'giant',
				descImage: '/images/blue.jpg',
				scale: 5,
			},

			{
				color: 'white',
				temp: '4,000 - 150,000 °C',
				age: 'dead',
				size: 'dwarf',
				descImage: '/images/whitedwa.jpg',
				scale: 3,
			},
		];

		star_example.map((example, index) => {
			var geometryExample = new THREE.SphereGeometry(example.scale, 8, 8);
			var materialExample = new THREE.MeshPhongMaterial({
				color: example.color,
			});
			this.sphereExample = new THREE.Mesh(geometryExample, materialExample);
			this.sphereExample.position.set(-95 + index * 50, 15, -105);
			// this.sphereExample.rotateX = 10;
			this.sceneStarInfo.add(this.sphereExample);

			this.cardGeo = new THREE.PlaneGeometry(30, 30);
			this.imageCArd = example.descImage;
			this.meshCard;
			this.textCard = new THREE.TextureLoader().load(this.imageCArd, tex => {
				tex.needsUpdate = true;
				this.meshCard.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
			});
			this.materialdifferentTypeStar = new THREE.MeshBasicMaterial({
				map: this.textCard,
				transparent: true,
			});
			this.meshCard = new THREE.Mesh(this.cardGeo, this.materialdifferentTypeStar);
			this.meshCard.position.set(-70 + index * 35, -20, -80);
			this.sceneStarInfo.add(this.meshCard);

			for (var i = 1, scaleX = 1.1, scaleY = 1.1, scaleZ = 1.1; i < 5; i++) {
				var starGlow = new THREE.Mesh(
					new THREE.SphereGeometry(example.scale, 32, 32),
					new THREE.MeshBasicMaterial({
						color: example.color,
						transparent: true,
						opacity: 0.5,
					})
				);
				starGlow.castShadow = false;
				scaleX += 0.4 + Math.random() * 0.5;
				scaleY += 0.4 + Math.random() * 0.5;
				scaleZ += 0.4 + Math.random() * 0.5;
				starGlow.scale.set(scaleX, scaleY, scaleZ);
				starGlow.origScale = {
					x: scaleX,
					y: scaleY,
					z: scaleZ,
				};
				starGlow.position.set(-95 + index * 50, 15, -105);

				// this.glows.push(starGlow);
				this.sceneStarInfo.add(starGlow);
			}
		});

		this.startGameFinalBtnGeo = new THREE.PlaneGeometry(200, 150);
		this.imgSrcStart = '/images/startGame.png';
		this.meshGameStartBtn;
		this.tex = new THREE.TextureLoader().load(this.imgSrcStart, tex => {
			tex.needsUpdate = true;
			this.meshGameStartBtn.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
		});
		this.materialStartButton = new THREE.MeshBasicMaterial({
			map: this.tex,
			transparent: true,
		});
		this.meshGameStartBtn = new THREE.Mesh(this.startGameFinalBtnGeo, this.materialStartButton);
		this.meshGameStartBtn.position.set(10, -105, -190);
		this.sceneStarInfo.add(this.meshGameStartBtn);
		this.meshGameStartBtn.cursor = 'pointer';
		this.meshGameStartBtn.on('click', ev => {
			console.log('i am here', ev);
			currentScene = 2;
			this.renderer.clear();
			console.log('scene', currentScene);
			this.camera.position.set(0, 0, 0);
			this.update(this.scene2, this.camera);
			return currentScene;
		});

		if (currentScene === 1) {
			this.update(this.scene, this.camera);
		} else if (currentScene === 2) {
			this.update(this.scene2, this.camera);
		} else if (currentScene === 3) {
			this.update(this.sceneStarInfo, this.camera);
		}

		console.log('scene', currentScene);
	}

	MainScreenDisplay(planets, ctx, bgStars, t, star, glows) {
		for (var p in planets) {
			var planet = planets[p];
			planet.rot += planet.rotSpeed;
			planet.rotation.set(0, planet.rot, 0);
			planet.orbit += planet.orbitSpeed;
			planet.position.set(
				Math.cos(planet.orbit) * planet.orbitRadius,
				0,
				Math.sin(planet.orbit) * planet.orbitRadius
			);
		}
		ctx.fillStyle = 'rgba(0,0,0,0.25)';
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.fillStyle = 'rgba(255,255,255,0.25)';

		for (var s in bgStars) {
			var q = bgStars[s],
				oX = q.x * ctx.canvas.width,
				oY = q.y * ctx.canvas.height,
				size = Math.random() < 0.9998 ? Math.random() : Math.random() * 3;

			ctx.beginPath();
			ctx.moveTo(oX, oY - size);
			ctx.lineTo(oX + size, oY);
			ctx.lineTo(oX, oY + size);
			ctx.lineTo(oX - size, oY);
			ctx.closePath();
			ctx.fill();
		}

		t += 0.01;
		star.rotation.set(0, t, 0);
		for (var g in glows) {
			var glow = glows[g];
			glow.scale.set(
				Math.max(
					glow.origScale.x - 0.2,
					Math.min(glow.origScale.x + 0.2, glow.scale.x + (Math.random() > 0.5 ? 0.005 : -0.005))
				),
				Math.max(
					glow.origScale.y - 0.2,
					Math.min(glow.origScale.y + 0.2, glow.scale.y + (Math.random() > 0.5 ? 0.005 : -0.005))
				),
				Math.max(
					glow.origScale.z - 0.2,
					Math.min(glow.origScale.z + 0.2, glow.scale.z + (Math.random() > 0.5 ? 0.005 : -0.005))
				)
			);
			glow.rotation.set(0, t, 0);
		}
	}

	update(scene, camera) {
		requestAnimationFrame(() => this.update(scene, camera));

		this.MainScreenDisplay(this.planets, this.ctx, this.bgStars, this.t, this.star, this.glows);

		this.sphere.rotation.x += this.options.velx;
		this.sphere.rotation.y += this.options.vely;
		this.renderer.clear();

		this.render(scene, camera);
	}

	render(scene, camera) {
		this.renderer.render(scene, camera);
	}
}

export default HomeScene;
