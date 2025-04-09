import { ILayout } from './types';

export const Layout = ({children}: ILayout) => {
    return (
        <div className='container'> 
            {children}
        </div>
    );
};
