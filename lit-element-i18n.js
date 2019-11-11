import i18next, { t as translate } from 'i18next'
import backend from 'i18next-xhr-backend'

export const i18nMixin = baseClass => class extends baseClass {

    firstUpdated(lng) {
        i18next.on('initialized', options => {
            this.requestUpdate()
        })
        i18next.on('languageChanged', options => {
            this.requestUpdate()
        })
        if (!i18next.isInitialized) {
            i18next.use(backend);
            i18next.init({
                lng: lng,
                debug: false,
                defaultNS: 'app',
                ns: ['app'],
                fallbackLng: 'en',
                backend: {
                    loadPath: this.languageResources || '/assets/locales/{{lng}}/{{ns}}.json'
                }
            })
        }

        super.firstUpdated && super.firstUpdated()
    }

    changeLanguage(lang) {
        i18next.changeLanguage(lang)
    }
}

export {
    translate
}