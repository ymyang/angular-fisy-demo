fis.config.set("project.watch.usePolling", true);
fis.set('prefix', 'app/');
fis.hook('module', {
    mode: 'mod'
});

fis.match('*', {
    relative: false,
    useHash: false,
    useDomain: false,
    domain: false,
    release: false,
    useSprite: false,
    __RESOURCE_MAP: true,
    deploy: fis.plugin('local-deliver', {
        to: '../_/'
    })
})
    .match('/app/libs/**.js', {
        isMod: false,
        release: '${prefix}/$&'
    })
    .match('/app/components/**/(*).js', {
        isMod: true,
        id: '$1',
        release: '${prefix}/$&',
        postprocessor: fis.plugin('jswrapper', {
            type: 'amd',
            wrapAll: true
        })
    })
    .match('/app/js/(**).js', {
        isMod: true,
        isAngular: true,
        //useHash: true,
        id: '$1',
        release: '${prefix}/$&',
        postprocessor: fis.plugin('jswrapper', {
            type: 'amd',
            wrapAll: true
        })
    })
    .match('/app/css/**.{css,less}', {
        release: '${prefix}/$&'
    })
    .match('/app/css/**.less', {
        rExt: '.css',
        parser: fis.plugin('less')
    })
    .match('/app/css/fonts/*.*', {
        release: '${prefix}/$&'
    })
    .match('/app/pages/(*.html)', {
        useCache: false,
        release: '${prefix}/$1'
    });

fis.match('::packager', {
    // npm install [-g] fis3-postpackager-loader
    // ���� __RESOURCE_MAP__ �ṹ���������Դ��������
    postpackager: fis.plugin('loader', {
        resourceType: 'mod',
        useInlineMap: true // ��Դӳ�����Ƕ
    }),
    packager: fis.plugin('map'),
    spriter: fis.plugin('csssprites', {
        layout: 'matrix',
        margin: '15'
    })
});

fis.media('prod')
    .match('/app/libs/**.js', {
        useHash: true,
        optimizer: fis.plugin('uglify-js'),
        packTo: '/pkg/libs.min.js'
    })
    .match('/app/components/**.js', {
        useHash: true,
        optimizer: fis.plugin('uglify-js'),
        packTo: '/pkg/components.min.js'
    })
    .match('/app/js/(*)/**.js', {
        useHash: true,
        preprocessor: fis.plugin('annotate'),
        optimizer: fis.plugin('uglify-js'),
        packTo: '/pkg/$1.min.js'
    })
    .match('/app/css/**.{css,less}', {
        useSprite: true,
        useHash: true,
        optimizer: fis.plugin('clean-css'),
        packTo: '/pkg/style.css'
    })
    .match('/app/css/fonts/*.*', {
        useHash: true,
        release: '${prefix}/fonts/$1'
    }).match('/pkg/(*.js)', {
        useHash: true,
        release: '${prefix}/js/$1'
    }).match('/pkg/(*.css)', {
        useHash: true,
        release: '${prefix}/css/$1'
    });