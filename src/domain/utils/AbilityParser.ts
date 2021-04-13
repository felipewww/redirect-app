export default class AbilityParser {
    private abilityStr: string;

    constructor() {
    }

    parse(abilityStr: string) {
        this.abilityStr = abilityStr;

        const stage = this.getStage();
        const year = this.getYear();
        const subject = this.getSubject();

        return {
            stage,
            year,
            subject,
            uri: `/${stage}/${year}/${subject}/habilidade/${this.abilityStr}`
        }
    }

    private getStage() {
        const index: string = this.abilityStr.slice(0,2)
        const stages: { [key:string]: string } = {
            'EF': 'fundamental',
            'EI': 'infantil',
        }

        return stages[index]
    }

    private getYear() {
        const index: string = this.abilityStr.slice(2,4)
        return index.replace('0', '').concat('ano')
    }

    private getSubject() {
        const index: string = this.abilityStr.slice(4,6)
        const subjects: { [key:string]: string } = {
            'LP': 'lingua-portuguesa',
            'GE': 'geografia',
            'CI': 'ciencias',
            'LI': 'lingua-inglesa',
            'HI': 'historia',
            'MA': 'matematica',
        }

        return subjects[index];
    }
}
