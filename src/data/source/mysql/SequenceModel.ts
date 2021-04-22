import {MySQL} from "@Data/source/mysql/MySQL";

export class SequenceModel extends MySQL {
    table = 'UnidadePlanoAula';
    alias = 'UPA';

    getStage(sequenceId: number): Promise<Array<any>> {
        const q = this
            .withCache('sequence_'+sequenceId.toString())
            .builder
            .select({
                year: 'HABPA.ano',
                uri: 'PA.urlPlanov2'
            })
            .from(this.getTableName())
            .innerJoin('UnidadesPlanosAula AS UPAS', 'UPA.id', 'UPAS.unidadesPlanos_id')
            .innerJoin('PlanoAula AS PA', 'PA.id', 'UPAS.planosAula_id')
            .innerJoin('habilidades AS HAB', 'HAB.planosAula_id', 'PA.id')
            .innerJoin('HabilidadePlanoAula AS HABPA', 'HABPA.id', 'HAB.habilidades_id')
            .where(this.alias+'.id', sequenceId)
            .limit(1)

        return this.exec(q);
    }
}
