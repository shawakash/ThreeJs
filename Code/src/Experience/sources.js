export default [
    {
        name: 'enviornmentMapTexture',
        type: 'cubeTextureLoader',
        path: [
            'textures/environmentMap/px.jpg',
            'textures/environmentMap/nx.jpg',
            'textures/environmentMap/py.jpg',
            'textures/environmentMap/ny.jpg',
            'textures/environmentMap/pz.jpg',
            'textures/environmentMap/nz.jpg'
        ]
    },
    {
        name: 'foxMixer',
        type: 'gltfLoader',
        path: 'models/Fox/glTF/Fox.gltf'
    },
    {
        name: 'floorColorTextureLoader',
        type: 'textureLoader',
        path: 'textures/dirt/color.jpg'
    },
    {
        name: 'floorNormalTextureLoader',
        type: 'textureLoader',
        path: 'textures/dirt/normal.jpg'
    },
]