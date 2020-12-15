<?xml version="1.0" encoding="UTF-8"?>
<xsl:transform version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:svg="http://www.w3.org/2000/svg">

  <xsl:param name="addAriaHidden" select="true()"/>

  <xsl:output method="text" encoding="UTF-8" omit-xml-declaration="yes"/>
  <xsl:strip-space elements="*"/>

  <xsl:template match="/">
    const xmlns = 'http://www.w3.org/2000/svg';
    <xsl:apply-templates/>
    <xsl:text>
    return svg;&#xa;&#xa;</xsl:text>
  </xsl:template>

  <xsl:template match="svg:svg">
    <xsl:call-template name="default"/>
    <xsl:if test="$addAriaHidden">
      <xsl:value-of select="name()"/>.setAttributeNS(null, 'aria-hidden', 'true');
    </xsl:if>
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="svg:title|svg:desc">
    let <xsl:value-of select="name()"/> = document.createElementNS(xmlns, '<xsl:value-of select="name()"/>');
    let text = document.createTextNode('<xsl:value-of select="."/>');
    <xsl:value-of select="name()"/>.appendChild(text);
    <xsl:call-template name="appendChild"/>
  </xsl:template>

  <xsl:template match="svg:*">
    <xsl:call-template name="default"/>
    <xsl:call-template name="appendChild"/>
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template name="default">
    let <xsl:value-of select="name()"/> = document.createElementNS(xmlns, '<xsl:value-of select="name()"/>');
    <xsl:for-each select="@*">
      <xsl:value-of select="name(parent::node())"/>.setAttributeNS(null, '<xsl:value-of select="name()"/>', '<xsl:value-of select="."/>');
    </xsl:for-each>
  </xsl:template>

  <xsl:template name="appendChild">
    <xsl:value-of select="name(..)"/>.appendChild(<xsl:value-of select="name()"/>);
  </xsl:template>

</xsl:transform>
