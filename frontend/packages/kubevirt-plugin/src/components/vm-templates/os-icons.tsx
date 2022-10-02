import * as React from 'react';
import { StarIcon } from '@patternfly/react-icons';
import { TemplateKind } from '@console/internal/module/k8s';
import { ANNOTATION_ICON } from '../../constants';

import './os-icons.scss';

const iconMap = {
  'icon-linux':
    'data:image/png;base64,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',
  'icon-centos':
    'data:image/png;base64,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',
  'icon-fedora':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABOxJREFUWEe1V2tMW2UYfr7DaGGFUi7OYMABgQnIZjGR4XXtYjIvUTFZjI6YzeyPGpcVMC5icJvJzPxBrSM6s6jBW7wFx5xRf9Gy6VwWHXXMFgIZQ6bIlNGWDhjQ85n3tD30tKfjdJnvjyb9Lu/7vM97+d7DkIJUW5seA2MNnPMSQDAB3By+ztyA6GOMnQfn3R7nm0e0qmXLHay02EoEQdjNORoAmJY7H9n3MYZunSg2uV0O39XuJAVgtthMcxB2MgZbCobjbfk4h2PAZd+bDIQqADJ+haU5lyjW5rcxJxu3VpbBHwjA4x2JucTceh6yqrGRAKDaYjNzJji1ek1Gn2l8CI9aa1CYv1I2Oj45g9cOOXG89wTE+Tla9zEuWj0uhzvWHQWAsOcCQdcU65rqcuzb9RQqitWPu4cnsaPjJIIXvLgyNS6B0HOxNJYJGUCqtBcXF6Lr3Z3IykxPGp8f+yfw8nu/SPtLIJjb62yvjV6SAVRvbN7DOXZrizbw6cFdqL1llXw8OLuAb3sH4B3+EzlGA2a4Hj95faD1qEwNhsPBGPZ6eux7pAKmn1Spv7PejPdff1pW/PelGWxtegdjYxLNsmQVVUGfWyj/pzAQE7GhkABUWVs6Ab5Vq/evvrQNTz6wVj6+vfVj/HxSkVvyXk5FHVZkZEn/eWgRlzzHInvsQ6+zfVsEQPOU1sSj27H0k/cbN7clxb7yxlJkripNCAOx4HXac1mVpaUBjB/W6n08gL7Bi2h87o2k1ykEFIqoBM71YeEy+UuUsMdZqvSnCsBQWIGMgmIZwGR/zxJYxt9iVdZmF4AN/wcDgi4DpvI6sLQVknpxYQ5TAydiTfUSA32pttzYHEgWgnRDrkQ9gYjK7MURzEwoWzQxwNW8p8xNN96A3Pw8NG1Zj8KCcCaTrLk5T9GATg9OyHvj/wZxoOt3zITSFGoX54LwD51KMJUAgOjKXr0W5AFJa+NteLCuKJUIoeOwB1+6ljyl8gucOw0CES8KAOS1sex2OWbXCuCr3hEc+Noj2Vq47MP06BmpB8QLB36TAZDnlDCxMaMLBh1Da+M6ZGfqpPtZBh0qipYeH2q1Q39EygrAX5NBOD7/Fb7JSekBUvM6BgglYTgH4hsGZez0+TOqCo581CaDWK4PXDV2kTKUAORW3gUhPZyxRBc9HGq00b6WKtCUNOFG1Mwp9tSzo5JYLkp11wmA3+u0myQAlPHGMvmJhqJdqrhyfQBEHiM1ADETjCqTnp52ef1Y3xiebXFoYjzmkF/PxRKajCQGqALyqu+T9+cD/2B6tF9VafwscKjrFBxvf5ESAMVAEq2C7NXroDMWyIrUWKAxrNP+vGL4fOKFgzjrGdYMgGp/wGmPfNAAchnG5wFprLkpDYuzQRj0wPraNXhkQ5WiBV9DCcrURxErOmHsCNWxox7m8vyknlEDun/LPgT801q9H2VcbEgYy+MfoyiIH/ZvgiEz/IzGy9AFH17Z/5lm6on2DC5aTOZNplBItJC+4x0Pd95rO9qgOg9QODY3WNG2/W6FbRq/vnGexQeffKfVcz9jcEQnYFJ2j+2ohYWEEs5gZoLoYpWWFy2MifQllCBUHfV31Ejr04GgZo8B+AHWrechW/znmMX2fQnpm4do0kHwSUNpBATN6SlNRlHE0qsG+MC4G6Lg8rrau7Umxn/hn0Gbb++TswAAAABJRU5ErkJggg==',
  'icon-debian':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH4QoZDjAx8mt58AAABGxJREFUWMPt2G/I3lMYB/DPc28epo292F7J8ncY45eEJYYtKSyMOS+Wd5QXqDGFMiLSDEkKkSX6qeUVI//DMrY4UmQ8pP0x/4r5s82z57m9ue76dXf/e+49j1E7dfc79++cc/2+5zrX9b2u67C/7W/j10rFlFIxLfqDTWPj8o2BPoFJcqN/Ju7HLOzAp9iEgzADDyZ5UzPwxvoJA9sAWSpqOBGP4Nweln6GmzAFbyX5j+ZNjyvYCtAC1+HaPk9zI1Yn+dGxAh6rZi/BGgy2GH4aL+EXbMY0nIDLsaTF/IzTkzw8bpqtaHQBXsaBleEf8BGWJfnrDjImYQVuaVr/Fi7EcC/arXWbEEBPxytNH1qB07AkyV+38/jY7EiS78DZ+L0yfD4ejW/0p9mKNsVxfoKjY3gHVsZvd6/2VpE5GxtwSGX4yiSv6UuzIXQupuMsHBVD7+PUJN+T5N1jsffG5oPGVsbrejxXloqpe2MGDRt8IE7gW1yc5KFOXNl8nNX/jflJvgdbQ+7z4ZizuoGd3OHIdpaKZ4NPv8fJSf6jB6o5JuhtRjjgx/iuBeir8Sbm4SL81k12O5udGkLWxoZuTvKqdsIq9rgKV+BJrMMoTsKeJD/epO3B2Mx03I3Hkry9L+oqFTfiIezEyRjqAnQpLkvy4hZzpmFakrdV3h2A93AGFuHVbpxbawN0MPhvAC8meajd8VSi2vUN8q8eeWzm9yRva7LnUXwX/bOTPNyNvmodbHlK9D/sREfRnsRdSR5pdrwqh7bg05F4XlAqDupGg5PbvB/F39Hf1oWOjsWcJK/tMm8G5ib57cpQI8isT/KufqmrVon/33SRcRy29MCzP+Pdptf1+C3vhatrPTjf9i4ydmF2I/FuYy4DpWIm6hUzqGE2PseuUjFlb8DWK+G1U/si5p7XoTKYjCNQr9jlbZgb6eaMJO8cD80OdjnerUFBy0rFQMVGJ5WK5aViTlDSxiTXK0vvxHNRWfy1N2YwUhEwrxMblIrDcTOOiUjU2MQIHsamoK96g3NLxTsRblfg7yT/1kvW1Q7sbvwc/bmdvBxTA+h9eKxULK+MDyd5T6VeuyGSoUMjXRxK8q5eC8pOEexW3Ivnkry0VaitRK+DsQAHYDWGcDs+iMJxEa5BgdciJP851qKxE9j5kclvwLwk1zsBjv5iHBnARzEzuPTXSGjWJHndhJTipWJHJN+bsSDJX3XLjELLs3EqJuFLrA/b1E9V2zWrj+dNpaIevzfHsraFI07sJUdkRj+FQ6zDOUke3Ve3PrUuHDocXt5gheP25RVVrYcjfSZi/yFYPJ53VxNyfVQqFuL1CBSHJfnXcXWS8dBsxXPfiAuKg/FJqZjZa62/L64zG88nghlebOQB/ybggT6AvxDlyyYcX4n5E24WtbFoNwBdhWWR8v0YiYx/wywG+jGHADYLT0VWtj7JC/9zZtAiH7g06v4t4YTb4/Jtd1P+um/AttnAKZiP4bh73ZDkPf4v7T9Jbftbi/YPAlio+nZXf4oAAAAASUVORK5CYII=',
  'icon-bsd':
    'data:image/png;base64,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',
  'icon-windows':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH4QoZDx8x4bUrqgAAAiRJREFUWMPtmc1K3FAUx3/JBPEDwVtRQes3VKnFtloR6roLne7yGj6Bj9CFDzB7l/MCIiK+hBS6LLMditrSmUmmi/yDIUys40zsnZoL4eTz5nfOuffckxMo2nNq1XrH045FgC4wpW0aWAIu8c23+BYvdwv5ptN5D3gDvAW2gQ3gJTAKjEm6wGcgJ9hq3QGG1O8wMES1PglsCmxH8sUDemsAYfKE1yPcoty1hm8qAvkiy8wBM8BIv2zhPRBqFngHbAHvJWeBksa9C1RksU95jSovBfUR+ACsAuuSq7bMwbRlj4CyrRHNTR2HNodfd5DWigK2gC1gC9j/ALZtEVspnW97HdKyWyDoQom20kH03DXwU4aI0zxH+/Eq2UjcH6iPpmRb1wPgR3ainPE50UUum2tzUi88UuYeAi1p52i/lXjmV+LZJlDCN4dU63PAQQfPpN/Z+ss9sQcu8E0taxjs6WWPaYdStNJHY5aBWtYEC3rs/HcfQZsJbxZxtoDNC7Y1SLDhIME6z3XMttPLvO0T7F5Yq+HTy+05YIiqMDP2wkblyWPgWMcl4BVRXWtbchMY10RKbk8Mm6yjRuABcKXtJHFtFFgGViSXJAFugO/yzhj/LNRkFYbvvBAou58gqtFOAK+Jisa7kvNdsDWAMr45yzcu3q/YsobTlpRZlxfiiveIlA6BfXxz+iRBvAsFxrn7nzAJLBDVf0/wzVc7Y1Ovn1ZFe2T7A8gRgAPZqOpqAAAAAElFTkSuQmCC',
  'icon-rhel':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAYAAABkWOo9AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAB3RJTUUH5AsJERkw6+TdXAAABCJJREFUWMO12F2IVVUUB/DfvndGrj5kDo4fZaZmSg1ZYWQRob6YJioZWQSVkZFBSiBiRD1EPfRSQdCH9RBBDxUoog+WJESCFJRFqaVlmVGmxmQ2kh/T3T3sc/U2cz/OnRn/sLnn3LPOOv+919rrYwc50X3+chSW4VLsyMap7Nl4vIi5+AEfYCt243S1vo68H84QWiQ5HC/hIbThT3yELRnZB7Gg6tWI37ETG7EdRwZCuFWii/A+Sn1EyhmpYgM1vdnKvpeNn1oh3ArRIt7CfTkXoRH2YX2m73gesk2JVq3mFZLpLh8CoiQLbMRjkns0JFpoQfFsXDZEJCuLdCdW5hHOS7QdC1ucWF4swMhBET10/nIqbroAJGEyJvI/N2uN6EQcTUJzcckFItqBrmZC/Yh2V41FmEPpMAtzhYeBoYjrcxGtJleNLTjCDW9yc/nCEZURLTUSaOtDboxkhi5MOkHnCrreYNRVxLsIUYorQ4wrMQ4H6xLNfjuxAndnL40g5cSebDyJXuIyQlFKRUOIcZgWObgYm+sQnYBXsLjvwwJKaQHDMcJaHCA+ShiNf4eOaClyXWDb5joCBaypRZIUPG+rWvYevEBYTtxO7NU4ubeCg8zsoNCldpgq1CNJMu/thEVVbhmxI5ENjxM/JZ7NJjOYbLCNGfOZsjq777u5QzfHMLqeggJ+Jq7CJzVqg4sxh7hEyghjCW3ZhColVSPdBXxOXEP5Wb6cy+unU4X2d0WuIyP6Fa7VROEh4tPYnO38vmjHZOKsjPDVUoa4iDAs01GZZRlncIT4MV7F94S3sYTe3hQZn8Leiv42bMIMDSqpMiYSXk6CcT3haB+Zs9hP2I93MJI4BuOJndl9O4VIPEn8jXAAvxDK2cdPpU+14Q4pba+Uim6hO5VtGzBTE4TMlLuIr+FDQk+zl3Kik7ghmTZURZPduAd7iuv4C4cxX2o1mmICYR5hFjHgD/TkLMJroQ2rsKS/jjFpDrYW16U/9kvOOwfDmimu9BxTMsLzJDsVpSRxKjNnM4T0XlyLhzNfroFJ2BOqQkARj+A5qdPMjcpG+Qe/EvfhW/womep49qxMaCeOkmq7G3Gr5P+VBaiDdwP9AuxSPC+l0pZRCTlRylxncDqLteUUumKJUJJMXpYrHX9xzif6kL0Gz0iVXltzPY1Ry3lbLGw+O5dM+jRW3+B+rJb8d1CINUaL+K7fZGvk2amS797rwlX5jXASD9QNKTUIz8ByyYeHqmXOgw1Y3jD21Wm2pkmZY2lGvmFlPkjskg489rZ6pFONDsyS2ujZ0gFFroSRA73SAdsT2MMAskkd0mOl1b1FCo/TpawyQv7qL2bqd0nlwiacqDwccNpr0IMPlzbdNKn3mi7F93HSQUMp+25Z2ijHcCAjuBNfqyrxSKb7D5OCCkrOlwyeAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTExLTA5VDE3OjI1OjQ4KzAwOjAwiv4GBAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0xMS0wOVQxNzoyNTo0OCswMDowMPujvrgAAAAASUVORK5CYII=',
  'icon-opensuse':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH4QoZDx0ySooYkgAAAyhJREFUWMPt2F+IVkUYx/HPvu6abYmGFUXZXwqK9CLIwqBugiY41LoFLugh6qJ/RIbdCP2hkMqLQoRAuqiMyZutzGLKU3RhgVEJUWHQH8IoshSy3GqL2na7mRcOb7ttreZrcH4wHOY558x8Z+Z5njNzaNSoUaNGjf6P6jlUDRVVuQhnYjZ+wjf4JIX4a1dhi6o8B3djCRbgeLSmeHwUP2AEX2AYT6cQx4uqXIrN+BIvo0ohfnjQsEVVzsXNuC3P4MHqc7yPazvsE3gDL2FzCnHfP4YtqrIfN2H9YXTPvbmcjy1YkUIca00Degd+Psygr2E55uJ2nIR3ppzZoioX4i2c2oWgn4cDuAsXo8ITWNQ7CegAXjgCMtXyHLj78AsGWx2g13cBdBQf1OpLsSP76wi2oR9lqwZ6ETZ1YQb7MYDLcn7ehu24BO/llAbzezPoHLzZxSX/NEOenuHXYVe+twcldrd9dhhzJmlkP47BUf8xbB+uxnd4F6/gwtzvVdiAnT1FVS7u8JmvsTqFONzhz2uwAhd0YeaHcUtv/iK1tTuFeFaGOyPnuX68ivUpxHVFVa7FPYcA4MccXH25zM6p9A/8nvP7xhTi2vYLvdm52xrKoG/nHNfWrRgvqnJJCvHeoiq34/UpIPbjoRzJi/OAOzWW8ynMyvuKWRl2HOMpxN/+sjcoqnKiXUkh9hRVeXmORjk79OXlb2tBCnF/UZXPdNhhawpxWYf79OIRrKqZN6QQ7/y3S9Hq2FjANbUGb0ghrsxBNpLt2/LAVubdUl33d3aQQhzLYLtq5sGZ+E0rfyHg7Hzdma+riqp8oKjKh1OIo3g228+tvf94R3t7/qavOuDCoipPmwnsc7Ulu6Jex31YU1TlpbVBzKvdf7KjvVOm6iiF+BlerJk2zQT2sVr9eRyHo3NQbcRACnFHzef21gC+xYk4IZePpulvqPbs0IxOCkVVrsajeePbgwexNSfpkzP4yvzOUynEG7t6BiuqcguWTfP8gRTi/G59k1u1JR3ElTnPTUxy1Pg4b4SPnNNtUZUtnIfrcCy+R0whftX8DGjUqFGjRo1moj8BMqbnkkFwOZgAAAAASUVORK5CYII=',
  'icon-ubuntu':
    'data:image/png;base64,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',
  'icon-other':
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4gcNDBco7j7B7AAABKdJREFUWMPtmM1PVFcYh5/3zp1RYEBmcAZEVGTQqiiKmlCcRRWbLoxddNUmXTTpn+DCpEmbsG2atH9Fu6hNlSZaEhsXVqNt4wdaUGEYBQYkzFfng5mB+3G6AI1aBhntaDTzbu7NOe8597lvfvd3zj1QiUogpST39fVpwWDwo2g0dmxqZqYRxS2FDGpKu53NJkb6+vrM1w577ty5NU6n82PgC2BHNBa7MjU90/NMmgFqFJFrKBlC7GFlmn+dPHly5pXBDgwM7HU4HOcB36O2IrDFIgkMg7omSoZAG9Y069qJEyfypcLqz0twOBxNT4K+QHiAIEhQCYCNpcT45tvv7ijFbRS3NGRQ0+yLz3sB/TV9K04UnQKdCJ8qFAZ0A3+uNEh7k9xg1bA1NTX4/f7iE2kagUAb69bVlQ121TLQdR3DMNC05d9vd8cuxicmaWxsRNMcuFxOTMNEc2hEo7FXW1mXy4XL5cK27eVtRTRSqRQjI6O0btlMx65dVFdX0x4I0Na2FV3X2b59G2vXrsHhcJS3skopLMsq+qBsNoPf58O2bdLpDIZhkC8UGJ+YwOvx8M72bSil2N/VhW3bTE1PMzkZKU9l5+fnsW0by7KW7R8L30fXdWrcNYyFw2Tn5nA4HBTyBQzDJBaPIyLcGxlhbm6uZNCSKltVVUUmk1kxZ/rhw8f3Dx6MP75PJJMAxGJxNBHy+UJ5ZSAi6PrL2bJlWViAYZrlhS0UCjidzhVz2ra2cqinB1stymVkZJQbNwcBqK6q4uDBA7jdbuLxOEPDd8hms+WBTaVSiMiKPny0t5cfT/1EKp1GRHj/aC97dndw++8hjhx+j9FQiInJCOsbGtBEymddfr8fv99f1A02b9rE3Xv3SKXTj93j4u+X6OratygjTcMwTAqFApGpKdLP0f8Lwz6p12LVraurJZVK/cdBXE4XwBL4Xj48fozm5g3lXRSSySSWZRVdFAzDWFbTSikA0uk0P5/u5/LlK/R0d7Nz547ywCqlcLvdZLPZojKYjUbZ1NLyVFtz8wZmo7NPtSWSSW4ODuL3+crnBtFodMX+SGSKnu5uDvW8y9hYGI/Hw/6ufZz9dQCA3iOHMU0TXdfxeOo5/9uF8sGuJs70/8Kezj10du4mGo1x+kw/+cLiAnD16h/U1tWSy+XIZLLl9dnVhGGaXL9+Y9m+XD5PLp9/qfnfzs13BbYCW4GtwFZg337Y13XWlVcQAsYEQk6na/xAV+c/Lw1bXV19Y2Fh4WvTND8DmkoAmlcwpaGGFTJU53ZPb21vW9jS0qL7fL5apVRARAJKqU+AjYCKx+OXROR7TdNO1dfXJ0uGDQaDs4lE4qxpmplIJDKZSCSOi0jzoz05EBYIKwh76z3R1kDrwuaNG3Wv11unlGpfAvpcRHzPbsiVUjYwCVxgsdIh27ZnTdNcvzT3038sJfwptNq2/QOQy+Vy/TZotTU1jUsValdKBYB1ywx9BDSqlAqJSGjpOur1esdEZH7VxwGlCE0ppScSiS+Br5b5OJdOuBkSkbBSKmzbdtiyrLtNTU1z/4fQ5UUGxePxD4AOEQnZtj3a0NAQFpEFKvGGxr+2AgqbGgdGVwAAAABJRU5ErkJggg==',
};

export const getTemplateOSIcon = (template: TemplateKind): string => {
  const icon = template.metadata.annotations?.[ANNOTATION_ICON];
  return iconMap[icon] || iconMap['icon-other'];
};

export const PinnedIcon = () => <StarIcon className="kv-pin-icon" />;

export const RemovePinnedIcon = () => <StarIcon className="kv-remove-pin-icon" />;