<?xml version="1.0" encoding="UTF-8"?>
<xsl:transform version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:svg="http://www.w3.org/2000/svg">

  <xsl:output method="text" encoding="UTF-8" omit-xml-declaration="yes"/>
  <xsl:strip-space elements="*"/>

  <xsl:template match="svg:svg">
    const xmlns = 'http://www.w3.org/2000/svg';
    <xsl:call-template name="default"/>
    <xsl:apply-templates/>
    <xml:text>
    return svg;
</xml:text>
  </xsl:template>

  <xsl:template match="svg:title">
    let title = document.createElementNS(xmlns, 'title');
    let text = document.createTextNode('<xsl:value-of select="."/>');
    title.appendChild(text);
    <xsl:call-template name="appendChild"/>
  </xsl:template>

  <xsl:template match="svg:*">
    <xsl:call-template name="default"/>
    <xsl:call-template name="appendChild"/>
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template name="default">
    <xsl:variable name="tagName" select="name()"/>
    let <xsl:value-of select="$tagName"/> = document.createElementNS(xmlns, '<xsl:value-of select="$tagName"/>');
    <xsl:for-each select="@*">
      <xsl:value-of select="$tagName"/>.setAttributeNS(null, '<xsl:value-of select="name()"/>', '<xsl:value-of select="."/>');
    </xsl:for-each>
  </xsl:template>

  <xsl:template name="appendChild">
    <xsl:value-of select="name(..)"/>.appendChild(<xsl:value-of select="name()"/>);
  </xsl:template>

</xsl:transform>
