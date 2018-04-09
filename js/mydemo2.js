var c = document.querySelector('#scene');
console.log("Hello")
var colors = [new THREE.Color(0xaa8a9a)];
var renderer = new THREE.WebGLRenderer({
  canvas: c,
  antialias: true
});

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(40, 1, 1, 1000);
camera.position.set(0, 0, 900);
renderer.setClearColor(colors[0]);


/*GEOMETRY*/
var group = new THREE.Group();

var kakaGeo = new THREE.IcosahedronGeometry(120,4);
for(var i = 0; i < kakaGeo.vertices.length; i++) {
    var vector = kakaGeo.vertices[i];
    vector._o = vector.clone();  
}

var reflectionCube = new THREE.CubeTextureLoader()
					.setPath( 'textures/' )
					.load( [ '1.jpg', '1.jpg', '1.jpg', '1.jpg', 'bottom.jpg', '1.jpg' ] );
scene.background = reflectionCube;

var kakaMat = new THREE.MeshStandardMaterial({
    color: 0xAAAAAA,
    roughness: 0.2,
	metalness: 0,
	emissive: 20,
	depthFunc: 3,
    shininess: 10,
  envMap: reflectionCube
})

var kaka = new THREE.Mesh(kakaGeo,kakaMat);
//group.add(kaka);
scene.add(kaka);


/*LIGHTS*/

var light3 = new THREE.HemisphereLight(0xff0000, 0x0000aa, 0.9);
scene.add(light3);

var light = new THREE.DirectionalLight(0xffaaff, 0.6);
light.position.set(-100, 300, -5000); 
scene.add(light);
var light2 = light.clone();
light2.position.set(100,100,100); 
scene.add(light2);


function updateVertices (a) {
    for(var i = 0; i < kakaGeo.vertices.length; i++) {
        var vector = kakaGeo.vertices[i];
        vector.copy(vector._o);
        var perlin = noise.simplex3(
            (vector.x * 0.006) + (a * 0.0002),
            (vector.y * 0.006) + (a * 0.0003),
            (vector.z * 0.006)
        );
      
        var ratio = ((perlin*0.4 ) + 0.8);
        vector.multiplyScalar(ratio);
    }
    kakaGeo.verticesNeedUpdate = true;
}
/*

renderer.render(scene,camera);
*/
updateVertices(1);
renderer.render(scene, camera);

var time=0;
function render(a) {
    time++;
    updateVertices(a);
    requestAnimationFrame(render);
    //updateVertices(a);
    kaka.rotation.y = (time/300);
    renderer.render(scene, camera);
}

requestAnimationFrame(render);

