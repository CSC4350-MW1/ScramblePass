import React, { forwardRef } from 'react';

export const Photo = forwardRef(({ url, style, ...props }, ref) => {
  const inlineStyles = {
    backgroundImage: `url("${url}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'grey',
    ...style,
  };

  return <div ref={ref} style={inlineStyles} {...props} />;
});
