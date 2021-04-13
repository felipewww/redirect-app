import moduleAlias from 'module-alias';

moduleAlias.addAliases({
    '@Core': __dirname + '/../core',
    '@Presentation': __dirname + '/../presentation',
    '@Domain': __dirname + '/../domain',
    '@Data': __dirname + '/../data',
});
