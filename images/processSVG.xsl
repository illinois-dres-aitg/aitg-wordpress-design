<?xml version="1.0" encoding="UTF-8"?>
<xsl:transform xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

  <xsl:output encoding="UTF-8" omit-xml-declaration="yes"/>
  <xsl:strip-space elements="*"/>

  <xsl:template match="/">
    const xmlns = 'http://www.w3.org/2000/svg';
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="*">
    <xsl:variable name="tagName" select="name()"/>
    let <xsl:value-of select="$tagName"/> = document.createElementNS(xmlns, '<xsl:value-of select="$tagName"/>');
    <xsl:for-each select="@*">
      <xsl:value-of select="$tagName"/>.setAttributeNS(null, '<xsl:value-of select="name()"/>', '<xsl:value-of select="."/>');
    </xsl:for-each>
    <xsl:choose>
      <xsl:when test="name()='title'">
    let text = document.createTextNode('<xsl:value-of select="."/>');
    title.appendChild(text);
    svg.appendChild(title);
      </xsl:when>
      <xsl:when test="name()='svg'">
        <xsl:apply-templates/>
      </xsl:when>
      <xsl:otherwise>
    <xsl:value-of select="name(..)"/>.appendChild(<xsl:value-of select="$tagName"/>);
        <xsl:apply-templates/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:transform>
