import React from 'react';

const Error = (props) => {
  return ( 
    <section className="authorise-page">
      <div className="authorise-page__text-box">
        <h1 className="authorise-page__heading">
          <span className="authorise-page__heading--main">{props.text}</span>
          <span className="authorise-page__heading--sub">{props.subtext}</span>
        </h1>
        {props.children}
      </div>
    </section>
   );
}
 
export default Error;