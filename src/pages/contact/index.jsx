import LayoutComponent from '../../shared/components/LayoutComponent';
import ContactComponent from './components/ContactComponent';

const ContactPage = () => {
    return (
        <LayoutComponent>
            <section className='mt-32'>
                <ContactComponent />
            </section>
        </LayoutComponent>
    )
}

export default ContactPage;