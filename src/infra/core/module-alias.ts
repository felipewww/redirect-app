import moduleAlias from 'module-alias';

moduleAlias.addAliases({
    '@Core': __dirname + '/../../core',
    '@Infra': __dirname + '/../../infra',
    '@Presenters': __dirname + '/../../presenters',
    '@Domain': __dirname + '/../../domain',
    '@Data': __dirname + '/../../data',
});
