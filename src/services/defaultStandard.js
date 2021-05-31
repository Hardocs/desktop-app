export const defaultStandard = {
  Description: {
    '@about': 'http://purl.org/dc/terms/',
    title: {
      '@lang': 'en-US',
      '#text':
        'The Dublin Core Terms Namespace providing access to its content by means of an RDF Schema.'
    },
    publisher: {
      '@lang': 'en-US',
      '#text': 'The Dublin Core Metadata Initiative'
    },
    description: {
      '@lang': 'en-US',
      '#text':
        'The Dublin Core Terms namespace provides URIs for the Dublin Core Element Set Qualifier Vocabulary. Vocabulary terms are declared using RDF Schema language to support RDF applications. The Dublin Core qualifiers form a richer vocabulary, which is intended to facilitate discovery of resources. It will be updated according to dc-usage decisions.'
    },
    language: {
      '@lang': 'en-US',
      '#text': 'English'
    },
    issued: '2000-07-11',
    modified: '2002-05-24',
    source: [
      {
        '@resource':
          'http://www.dublincore.org/documents/2000/07/11/dcmes-qualifiers/'
      },
      {
        '@resource': 'http://www.dublincore.org/usage/decisions/'
      }
    ],
    requires: {
      '@resource': 'http://purl.org/dc/elements/1.1/'
    },
    references: {
      '@resource': 'http://purl.org/dc/dcmitype/'
    }
  },
  Property: [
    {
      '@about': 'http://purl.org/dc/terms/audience',
      label: {
        '@lang': 'en-US',
        '#text': 'Audience'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'A class of entity for whom the resource is intended or useful.'
      },
      description: {
        '@lang': 'en-US',
        '#text':
          'A class of entity may be determined by the creator or the \n\t\tpublisher or by a third party.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2001-05-21',
      modified: '2002-06-15',
      type: {
        '@resource': 'http://dublincore.org/usage/documents/principles/#element'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#audience-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/alternative',
      label: {
        '@lang': 'en-US',
        '#text': 'Alternative'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'Any form of the title used as a substitute or alternative \n\t\tto the formal title of the resource.'
      },
      description: {
        '@lang': 'en-US',
        '#text':
          'This qualifier can include Title abbreviations as well \n\t\tas translations.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/title'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource':
          'http://dublincore.org/usage/terms/history/#alternative-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/tableOfContents',
      label: {
        '@lang': 'en-US',
        '#text': 'Table Of Contents'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'A list of subunits of the content of the resource.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/description'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource':
          'http://dublincore.org/usage/terms/history/#tableOfContents-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/abstract',
      label: {
        '@lang': 'en-US',
        '#text': 'Abstract'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'A summary of the content of the resource.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/description'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#abstract-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/created',
      label: {
        '@lang': 'en-US',
        '#text': 'Created'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'Date of creation of the resource.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/date'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#created-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/valid',
      label: {
        '@lang': 'en-US',
        '#text': 'Valid'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'Date (often a range) of validity of a resource.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/date'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#valid-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/available',
      label: {
        '@lang': 'en-US',
        '#text': 'Available'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'Date (often a range) that the resource will become or did \n\t\tbecome available.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/date'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#available-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/issued',
      label: {
        '@lang': 'en-US',
        '#text': 'Issued'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'Date of formal issuance (e.g., publication) of the resource.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/date'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#issued-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/modified',
      label: {
        '@lang': 'en-US',
        '#text': 'Modified'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'Date on which the resource was changed.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/date'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#modified-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/extent',
      label: {
        '@lang': 'en-US',
        '#text': 'Extent'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'The size or duration of the resource.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/format'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#extent-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/medium',
      label: {
        '@lang': 'en-US',
        '#text': 'Medium'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'The material or physical carrier of the resource.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/format'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#medium-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/isVersionOf',
      label: {
        '@lang': 'en-US',
        '#text': 'Is Version Of'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'The described resource is a version, edition, or adaptation \n\t\tof the referenced resource. Changes in version imply substantive \n\t\tchanges in content rather than differences in format.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/relation'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource':
          'http://dublincore.org/usage/terms/history/#isVersionOf-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/hasVersion',
      label: {
        '@lang': 'en-US',
        '#text': 'Has Version'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'The described resource has a version, edition, or adaptation, \n\t\tnamely, the referenced resource.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/relation'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#hasVersion-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/isReplacedBy',
      label: {
        '@lang': 'en-US',
        '#text': 'Is Replaced By'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'The described resource is supplanted, displaced, or \n\t\tsuperseded by the referenced resource.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/relation'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource':
          'http://dublincore.org/usage/terms/history/#isReplacedBy-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/replaces',
      label: {
        '@lang': 'en-US',
        '#text': 'Replaces'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'The described resource supplants, displaces, or supersedes \n\t\tthe referenced resource.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/relation'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#replaces-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/isRequiredBy',
      label: {
        '@lang': 'en-US',
        '#text': 'Is Required By'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'The described resource is required by the referenced resource, \n\t\teither physically or logically.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/relation'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource':
          'http://dublincore.org/usage/terms/history/#isRequiredBy-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/requires',
      label: {
        '@lang': 'en-US',
        '#text': 'Requires'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'The described resource requires the referenced resource to \n\t\tsupport its function, delivery, or coherence of content.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/relation'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#requires-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/isPartOf',
      label: {
        '@lang': 'en-US',
        '#text': 'Is Part Of'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'The described resource is a physical or logical part of the \n\t\treferenced resource.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/relation'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#isPartOf-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/hasPart',
      label: {
        '@lang': 'en-US',
        '#text': 'Has Part'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'The described resource includes the referenced resource either \n\t\tphysically or logically.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/relation'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#hasPart-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/isReferencedBy',
      label: {
        '@lang': 'en-US',
        '#text': 'Is Referenced By'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'The described resource is referenced, cited, or otherwise \n\t\tpointed to by the referenced resource.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/relation'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource':
          'http://dublincore.org/usage/terms/history/#isReferencedBy-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/references',
      label: {
        '@lang': 'en-US',
        '#text': 'References'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'The described resource references, cites, or otherwise points \n\t\tto the referenced resource.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/relation'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#references-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/isFormatOf',
      label: {
        '@lang': 'en-US',
        '#text': 'Is Format Of'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'The described resource is the same intellectual content of \n\t\tthe referenced resource, but presented in another format.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/relation'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#isFormatOf-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/hasFormat',
      label: {
        '@lang': 'en-US',
        '#text': 'Has Format'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'The described resource pre-existed the referenced resource, \n\t\twhich is essentially the same intellectual content presented \n\t\tin another format.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/relation'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#hasFormat-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/conformsTo',
      label: {
        '@lang': 'en-US',
        '#text': 'Conforms To'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'A reference to an established standard to which the resource conforms.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2001-05-21',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/relation'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#conformsTo-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/spatial',
      label: {
        '@lang': 'en-US',
        '#text': 'Spatial'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'Spatial characteristics of the intellectual content of the resource.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/coverage'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#spatial-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/temporal',
      label: {
        '@lang': 'en-US',
        '#text': 'Temporal'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'Temporal characteristics of the intellectual content of the resource.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/coverage'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#temporal-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/mediator',
      label: {
        '@lang': 'en-US',
        '#text': 'Mediator'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'A class of entity that mediates access to the\n\t\tresource and for whom the resource is intended or useful.'
      },
      description: {
        '@lang': 'en-US',
        '#text':
          'The audiences for a resource are of two basic classes: (1) an \n\t\tultimate beneficiary of the resource, and (2) frequently, an \n\t\tentity that mediates access to the resource.  The mediator \n\t\telement refinement represents the second of these two classes.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2001-05-21',
      modified: '2002-07-13',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/terms/audience'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#mediator-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/dateAccepted',
      label: {
        '@lang': 'en-US',
        '#text': 'Date Accepted'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'Date of acceptance of the resource (e.g. of thesis\n\t\tby university department, of article by journal, etc.).'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2002-07-13',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/date'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource':
          'http://dublincore.org/usage/terms/history/#dateAccepted-001'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/dateCopyrighted',
      label: {
        '@lang': 'en-US',
        '#text': 'Date Copyrighted'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'Date of a statement of copyright.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2002-07-13',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/date'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource':
          'http://dublincore.org/usage/terms/history/#dateCopyrighted-001'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/dateSubmitted',
      label: {
        '@lang': 'en-US',
        '#text': 'Date Submitted'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'Date of submission of the resource (e.g. thesis, \n\t\tarticles, etc.).'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2002-07-13',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/date'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource':
          'http://dublincore.org/usage/terms/history/#dateSubmitted-001'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/educationLevel',
      label: {
        '@lang': 'en-US',
        '#text': 'Audience Education Level'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'A general statement describing the education or \n\t\ttraining context.  Alternatively, a more specific \n\t\tstatement of the location of the audience in terms of \n\t\tits progression through an education or training context.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2002-07-13',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/terms/audience'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource':
          'http://dublincore.org/usage/terms/history/#educationLevel-001'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/accessRights',
      label: {
        '@lang': 'en-US',
        '#text': 'Access Rights'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'Information about who can access the\n        resource or an indication of its security status.'
      },
      description: {
        '@lang': 'en-US',
        '#text':
          'Access Rights may include information\n        regarding access or restrictions based on privacy, \n        security or other regulations.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2003-02-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/rights'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource':
          'http://dublincore.org/usage/terms/history/#accessRights-001'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/bibliographicCitation',
      label: {
        '@lang': 'en-US',
        '#text': 'Bibliographic Citation'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'A bibliographic reference for the resource.'
      },
      description: {
        '@lang': 'en-US',
        '#text':
          'Recommended practice is to include sufficient \n        bibliographic detail to identify the resource as \n        unambiguously as possible, whether or not the\n        citation is in a standard form.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2003-02-15',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/identifier'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource':
          'http://dublincore.org/usage/terms/history/#bibliographicCitation-001'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/license',
      label: {
        '@lang': 'en-US',
        '#text': 'License'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'A legal document giving official permission to do something\n        with the resource.'
      },
      description: {
        '@lang': 'en-US',
        '#text':
          'Recommended best practice is to identify the license using a\n        URI. Examples of such licenses can be found at\n        http://creativecommons.org/licenses/.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2004-06-14',
      subPropertyOf: {
        '@resource': 'http://purl.org/dc/elements/1.1/rights'
      },
      type: {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#element-refinement'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#license-001'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/rightsHolder',
      label: {
        '@lang': 'en-US',
        '#text': 'Rights Holder'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'A person or organization owning or managing rights over the resource.'
      },
      description: {
        '@lang': 'en-US',
        '#text':
          'Recommended best practice is to use the URI or name of\n        the Rights Holder to indicate the entity.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2004-06-14',
      type: {
        '@resource': 'http://dublincore.org/usage/documents/principles/#element'
      },
      hasVersion: {
        '@resource':
          'http://dublincore.org/usage/terms/history/#rightsHolder-001'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/provenance',
      label: {
        '@lang': 'en-US',
        '#text': 'Provenance'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'A statement of any changes in ownership and custody\n        of the resource since its creation that are\n        significant for its authenticity, integrity and\n        interpretation.'
      },
      description: {
        '@lang': 'en-US',
        '#text':
          'The statement may include a description of any\n        changes successive custodians made to the resource.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2004-09-20',
      type: {
        '@resource': 'http://dublincore.org/usage/documents/principles/#element'
      },
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#provenance-001'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/instructionalMethod',
      label: {
        '@lang': 'en-US',
        '#text': 'Instructional Method'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'A process, used to engender knowledge, attitudes and skills,\n                    that the resource is designed to support.'
      },
      description: {
        '@lang': 'en-US',
        '#text':
          'Instructional Method will typically include ways of presenting\n                 instructional materials or conducting instructional activities,\n                 patterns of learner-to-learner and learner-to-instructor interactions,\n                 and mechanisms by which group and individual levels of learning are measured.\n                 Instructional methods include all aspects of the instruction and learning\n                 processes from planning and implementation through evaluation and \n                 feedback.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2005-06-13',
      type: {
        '@resource': 'http://dublincore.org/usage/documents/principles/#element'
      },
      hasVersion: {
        '@resource':
          'http://dublincore.org/usage/terms/history/#instructionalMethod-001'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/accrualMethod',
      label: {
        '@lang': 'en-US',
        '#text': 'Accrual Method'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'The method by which items are added to a collection.'
      },
      description: {
        '@lang': 'en-US',
        '#text':
          'Recommended best practice is to use a value from a controlled\n                 vocabulary.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2005-06-13',
      type: {
        '@resource': 'http://dublincore.org/usage/documents/principles/#element'
      },
      hasVersion: {
        '@resource':
          'http://dublincore.org/usage/terms/history/#accrualMethod-001'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/accrualPeriodicity',
      label: {
        '@lang': 'en-US',
        '#text': 'Accrual Periodicity'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'The frequency with which items are added to a collection.'
      },
      description: {
        '@lang': 'en-US',
        '#text':
          'Recommended best practice is to use a value from a \n                 controlled vocabulary.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2005-06-13',
      type: {
        '@resource': 'http://dublincore.org/usage/documents/principles/#element'
      },
      hasVersion: {
        '@resource':
          'http://dublincore.org/usage/terms/history/#accrualPeriodicity-001'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/accrualPolicy',
      label: {
        '@lang': 'en-US',
        '#text': 'Accrual Policy'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'The policy governing the addition of items to a collection.'
      },
      description: {
        '@lang': 'en-US',
        '#text':
          'Recommended best practice is to use a value from a controlled\n                 vocabulary.'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2005-06-13',
      type: {
        '@resource': 'http://dublincore.org/usage/documents/principles/#element'
      },
      hasVersion: {
        '@resource':
          'http://dublincore.org/usage/terms/history/#accrualPolicy-001'
      }
    }
  ],
  Class: [
    {
      '@about': 'http://purl.org/dc/terms/SubjectScheme',
      label: {
        '@lang': 'en-US',
        '#text': 'Subject Encoding Schemes'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'A set of subject encoding schemes and/or formats'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      references: {
        '@resource': 'http://purl.org/dc/elements/1.1/subject'
      },
      issued: '2000-07-11'
    },
    {
      '@about': 'http://purl.org/dc/terms/DateScheme',
      label: {
        '@lang': 'en-US',
        '#text': 'Date Encoding Schemes'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'A set of date encoding schemes and/or formats'
      },
      references: [
        {
          '@resource': 'http://purl.org/dc/elements/1.1/date'
        },
        {
          '@resource': 'http://purl.org/dc/terms/temporal'
        }
      ],
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11'
    },
    {
      '@about': 'http://purl.org/dc/terms/FormatScheme',
      label: {
        '@lang': 'en-US',
        '#text': 'Format Encoding Schemes'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'A set of format encoding schemes.'
      },
      references: {
        '@resource': 'http://purl.org/dc/elements/1.1/format'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11'
    },
    {
      '@about': 'http://purl.org/dc/terms/LanguageScheme',
      label: {
        '@lang': 'en-US',
        '#text': 'Language Encoding Schemes'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'A set of language encoding schemes and/or formats.'
      },
      references: {
        '@resource': 'http://purl.org/dc/elements/1.1/language'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11'
    },
    {
      '@about': 'http://purl.org/dc/terms/SpatialScheme',
      label: {
        '@lang': 'en-US',
        '#text': 'Place Encoding Schemes'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'A set of geographic place encoding schemes and/or formats'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      references: {
        '@resource': 'http://purl.org/dc/terms/spatial'
      },
      issued: '2000-07-11'
    },
    {
      '@about': 'http://purl.org/dc/terms/TemporalScheme',
      label: {
        '@lang': 'en-US',
        '#text': 'Encoding Schemes\n      for temporal characteristics'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'A set of encoding schemes for \n     the coverage qualifier "temporal"'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      references: {
        '@resource': 'http://purl.org/dc/terms/temporal'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/TypeScheme',
      label: {
        '@lang': 'en-US',
        '#text': 'Resource Type Encoding Schemes'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'A set of resource type encoding schemes and/or formats'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      references: {
        '@resource': 'http://purl.org/dc/elements/1.1/type'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/IdentifierScheme',
      label: {
        '@lang': 'en-US',
        '#text': 'Resource Identifier Encoding Schemes'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'A set of resource identifier encoding schemes and/or formats'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      references: {
        '@resource': 'http://purl.org/dc/elements/1.1/identifier'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/RelationScheme',
      label: {
        '@lang': 'en-US',
        '#text': 'Resource Relation Encoding Schemes'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'A set of resource relation encoding schemes and/or formats'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      references: {
        '@resource': 'http://purl.org/dc/elements/1.1/relation'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/SourceScheme',
      label: {
        '@lang': 'en-US',
        '#text': 'Source Encoding Schemes'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'A set of source encoding schemes and/or formats'
      },
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      references: {
        '@resource': 'http://purl.org/dc/elements/1.1/source'
      }
    }
  ],
  SubjectScheme: [
    {
      '@about': 'http://purl.org/dc/terms/LCSH',
      label: {
        '@lang': 'en-US',
        '#text': 'LCSH'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'Library of Congress Subject Headings'
      },
      type: [
        {
          '@resource': 'http://www.w3.org/2000/01/rdf-schema#Class'
        },
        {
          '@resource':
            'http://dublincore.org/usage/documents/principles/#encoding-scheme'
        }
      ],
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#LCSH-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/MESH',
      label: {
        '@lang': 'en-US',
        '#text': 'MeSH'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'Medical Subject Headings'
      },
      type: [
        {
          '@resource': 'http://www.w3.org/2000/01/rdf-schema#Class'
        },
        {
          '@resource':
            'http://dublincore.org/usage/documents/principles/#encoding-scheme'
        }
      ],
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      seeAlso: {
        '@resource': 'http://www.nlm.nih.gov/mesh/meshhome.html'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#MESH-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/DDC',
      label: {
        '@lang': 'en-US',
        '#text': 'DDC'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'Dewey Decimal Classification'
      },
      type: [
        {
          '@resource': 'http://www.w3.org/2000/01/rdf-schema#Class'
        },
        {
          '@resource':
            'http://dublincore.org/usage/documents/principles/#encoding-scheme'
        }
      ],
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      seeAlso: {
        '@resource': 'http://www.oclc.org/dewey/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#DDC-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/LCC',
      label: {
        '@lang': 'en-US',
        '#text': 'LCC'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'Library of Congress Classification'
      },
      type: [
        {
          '@resource': 'http://www.w3.org/2000/01/rdf-schema#Class'
        },
        {
          '@resource':
            'http://dublincore.org/usage/documents/principles/#encoding-scheme'
        }
      ],
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      seeAlso: {
        '@resource': 'http://lcweb.loc.gov/catdir/cpso/lcco/lcco.html'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#LCC-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/UDC',
      label: {
        '@lang': 'en-US',
        '#text': 'UDC'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'Universal Decimal Classification'
      },
      type: [
        {
          '@resource': 'http://www.w3.org/2000/01/rdf-schema#Class'
        },
        {
          '@resource':
            'http://dublincore.org/usage/documents/principles/#encoding-scheme'
        }
      ],
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      seeAlso: {
        '@resource': 'http://www.udcc.org/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#UDC-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/NLM',
      label: {
        '@lang': 'en-US',
        '#text': 'NLM'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'National Library of Medicine Classification'
      },
      type: [
        {
          '@resource': 'http://www.w3.org/2000/01/rdf-schema#Class'
        },
        {
          '@resource':
            'http://dublincore.org/usage/documents/principles/#encoding-scheme'
        }
      ],
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      seeAlso: {
        '@resource': 'http://wwwcf.nlm.nih.gov/class/'
      },
      issued: '2005-06-13',
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#NLM-001'
      }
    }
  ],
  TypeScheme: {
    '@about': 'http://purl.org/dc/terms/DCMIType',
    label: {
      '@lang': 'en-US',
      '#text': 'DCMI Type Vocabulary'
    },
    comment: {
      '@lang': 'en-US',
      '#text':
        'A list of types used to categorize the nature or genre \n\t\t\t\t\t\t\t\t\t\tof the content of the resource.'
    },
    type: [
      {
        '@resource': 'http://www.w3.org/2000/01/rdf-schema#Class'
      },
      {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#encoding-scheme'
      }
    ],
    isDefinedBy: {
      '@resource': 'http://purl.org/dc/terms/'
    },
    seeAlso: {
      '@resource': 'http://dublincore.org/documents/dcmi-type-vocabulary/'
    },
    issued: '2000-07-11',
    modified: '2002-06-15',
    hasVersion: {
      '@resource': 'http://dublincore.org/usage/terms/history/#DCMIType-002'
    }
  },
  FormatScheme: {
    '@about': 'http://purl.org/dc/terms/IMT',
    label: {
      '@lang': 'en-US',
      '#text': 'IMT'
    },
    comment: {
      '@lang': 'en-US',
      '#text': 'The Internet media type of the resource.'
    },
    type: [
      {
        '@resource': 'http://www.w3.org/2000/01/rdf-schema#Class'
      },
      {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#encoding-scheme'
      }
    ],
    isDefinedBy: {
      '@resource': 'http://purl.org/dc/terms/'
    },
    seeAlso: {
      '@resource': 'http://www.iana.org/assignments/media-types/'
    },
    issued: '2000-07-11',
    modified: '2004-12-17',
    hasVersion: {
      '@resource': 'http://dublincore.org/usage/terms/history/#IMT-003'
    }
  },
  LanguageScheme: [
    {
      '@about': 'http://purl.org/dc/terms/ISO639-2',
      label: {
        '@lang': 'en-US',
        '#text': 'ISO 639-2'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'ISO 639-2: Codes for the representation of names of languages.'
      },
      type: [
        {
          '@resource': 'http://www.w3.org/2000/01/rdf-schema#Class'
        },
        {
          '@resource':
            'http://dublincore.org/usage/documents/principles/#encoding-scheme'
        }
      ],
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      seeAlso: {
        '@resource': 'http://lcweb.loc.gov/standards/iso639-2/langhome.html'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#ISO639-2-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/RFC1766',
      label: {
        '@lang': 'en-US',
        '#text': 'RFC 1766'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          "Internet RFC 1766 'Tags for the identification of Language' \n\t\t\t\t\t\t\t\t\t\tspecifies a two letter code taken from ISO 639, followed \n\t\t\t\t\t\t\t\t\t\toptionally by a two letter country code taken from ISO 3166."
      },
      type: [
        {
          '@resource': 'http://www.w3.org/2000/01/rdf-schema#Class'
        },
        {
          '@resource':
            'http://dublincore.org/usage/documents/principles/#encoding-scheme'
        }
      ],
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      seeAlso: {
        '@resource': 'http://www.ietf.org/rfc/rfc1766.txt'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#RFC1766-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/RFC3066',
      label: {
        '@lang': 'en-US',
        '#text': 'RFC 3066'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          "Internet RFC 3066 'Tags for the Identification of \n\t\tLanguages' specifies a primary subtag which\n\t\tis a two-letter code taken from ISO 639 part\n\t\t1 or a three-letter code taken from ISO 639\n\t\tpart 2, followed optionally by a two-letter\n\t\tcountry code taken from ISO 3166.  When a\n\t\tlanguage in ISO 639 has both a two-letter and\n\t\tthree-letter code, use the two-letter code;\n\t\twhen it has only a three-letter code, use the\n\t\tthree-letter code.  This RFC replaces RFC\n\t\t1766."
      },
      type: [
        {
          '@resource': 'http://www.w3.org/2000/01/rdf-schema#Class'
        },
        {
          '@resource':
            'http://dublincore.org/usage/documents/principles/#encoding-scheme'
        }
      ],
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      seeAlso: {
        '@resource': 'http://www.ietf.org/rfc/rfc3066.txt'
      },
      issued: '2002-07-13',
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#RFC3066-001'
      }
    }
  ],
  IdentifierScheme: {
    '@about': 'http://purl.org/dc/terms/URI',
    label: {
      '@lang': 'en-US',
      '#text': 'URI'
    },
    comment: {
      '@lang': 'en-US',
      '#text': 'A URI Uniform Resource Identifier'
    },
    type: [
      {
        '@resource': 'http://www.w3.org/2000/01/rdf-schema#Class'
      },
      {
        '@resource': 'http://purl.org/dc/terms/SourceScheme'
      },
      {
        '@resource': 'http://purl.org/dc/terms/RelationScheme'
      },
      {
        '@resource':
          'http://dublincore.org/usage/documents/principles/#encoding-scheme'
      }
    ],
    isDefinedBy: {
      '@resource': 'http://purl.org/dc/terms/'
    },
    seeAlso: {
      '@resource': 'http://www.ietf.org/rfc/rfc2396.txt'
    },
    issued: '2000-07-11',
    modified: '2002-06-15',
    hasVersion: {
      '@resource': 'http://dublincore.org/usage/terms/history/#URI-002'
    }
  },
  SpatialScheme: [
    {
      '@about': 'http://purl.org/dc/terms/Point',
      label: {
        '@lang': 'en-US',
        '#text': 'DCMI Point'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'The DCMI Point identifies a point in space using its geographic coordinates.'
      },
      type: [
        {
          '@resource': 'http://www.w3.org/2000/01/rdf-schema#Class'
        },
        {
          '@resource':
            'http://dublincore.org/usage/documents/principles/#encoding-scheme'
        }
      ],
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      seeAlso: {
        '@resource': 'http://dublincore.org/documents/dcmi-point/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#Point-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/ISO3166',
      label: {
        '@lang': 'en-US',
        '#text': 'ISO 3166'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'ISO 3166 Codes for the representation of names of countries'
      },
      type: [
        {
          '@resource': 'http://www.w3.org/2000/01/rdf-schema#Class'
        },
        {
          '@resource':
            'http://dublincore.org/usage/documents/principles/#encoding-scheme'
        }
      ],
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      seeAlso: {
        '@resource':
          'http://www.iso.org/iso/en/prods-services/iso3166ma/02iso-3166-code-lists/list-en1.html'
      },
      issued: '2000-07-11',
      modified: '2004-12-17',
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#ISO3166-003'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/Box',
      label: {
        '@lang': 'en-US',
        '#text': 'DCMI Box'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'The DCMI Box identifies a region of space using its geographic limits.'
      },
      type: [
        {
          '@resource': 'http://www.w3.org/2000/01/rdf-schema#Class'
        },
        {
          '@resource':
            'http://dublincore.org/usage/documents/principles/#encoding-scheme'
        }
      ],
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      seeAlso: {
        '@resource': 'http://dublincore.org/documents/dcmi-box/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#Box-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/TGN',
      label: {
        '@lang': 'en-US',
        '#text': 'TGN'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'The Getty Thesaurus of Geographic Names'
      },
      type: [
        {
          '@resource': 'http://www.w3.org/2000/01/rdf-schema#Class'
        },
        {
          '@resource':
            'http://dublincore.org/usage/documents/principles/#encoding-scheme'
        }
      ],
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      seeAlso: {
        '@resource':
          'http://www.getty.edu/research/tools/vocabulary/tgn/index.html'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#TGN-002'
      }
    }
  ],
  DateScheme: [
    {
      '@about': 'http://purl.org/dc/terms/Period',
      label: {
        '@lang': 'en-US',
        '#text': 'DCMI Period'
      },
      comment: {
        '@lang': 'en-US',
        '#text': 'A specification of the limits of a time interval.'
      },
      type: [
        {
          '@resource': 'http://www.w3.org/2000/01/rdf-schema#Class'
        },
        {
          '@resource': 'http://purl.org/dc/terms/TemporalScheme'
        },
        {
          '@resource':
            'http://dublincore.org/usage/documents/principles/#encoding-scheme'
        }
      ],
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      seeAlso: {
        '@resource': 'http://dublincore.org/documents/dcmi-period/'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#Period-002'
      }
    },
    {
      '@about': 'http://purl.org/dc/terms/W3CDTF',
      label: {
        '@lang': 'en-US',
        '#text': 'W3C-DTF'
      },
      comment: {
        '@lang': 'en-US',
        '#text':
          'W3C Encoding rules for dates and times - a profile based on ISO 8601'
      },
      type: [
        {
          '@resource': 'http://www.w3.org/2000/01/rdf-schema#Class'
        },
        {
          '@resource': 'http://purl.org/dc/terms/TemporalScheme'
        },
        {
          '@resource':
            'http://dublincore.org/usage/documents/principles/#encoding-scheme'
        }
      ],
      isDefinedBy: {
        '@resource': 'http://purl.org/dc/terms/'
      },
      seeAlso: {
        '@resource': 'http://www.w3.org/TR/NOTE-datetime'
      },
      issued: '2000-07-11',
      modified: '2002-06-15',
      hasVersion: {
        '@resource': 'http://dublincore.org/usage/terms/history/#W3CDTF-002'
      }
    }
  ]
};
